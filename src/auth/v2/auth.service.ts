import { ConfigService } from '@app/config';
import { AutoRedis } from '@app/decorator';
import { JwtService } from '@app/jwt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import Redis, { Cluster } from 'ioredis';
import { AccountService } from '../../account/account.service';
import { LoginDto } from '../dto/login.dto';
import { PrismaService } from '@app/prisma';

const sessionToId = (session: string) => `SESSION::${session}::SESSION-ID`;
const idToSession = (id: string) => `SESSION::${id}::ID-SESSION`;
const TOKEN = (id: string | bigint, type: 'access' | 'refresh') =>
  `TOKEN::${id}::${type.toUpperCase()}`;
const tokenToId = (token: string) => `TOKEN::${token}::TOKEN-ID`;

@Injectable()
export class V2AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly account: AccountService,
    private readonly prisma: PrismaService,
    @AutoRedis() private readonly redis: Redis | Cluster,
  ) {}
  createCode() {
    return randomUUID();
  }
  createSession() {
    return randomUUID();
  }
  async invokeSession(id: string | bigint, session: string) {
    const ttl = this.config.get('cache.ttl.auth.token.access')!;
    await this.redis.psetex(sessionToId(session), ttl, id.toString());
    await this.redis.psetex(idToSession(id.toString()), ttl, session);
  }
  async revokeSession(session: string) {
    const id = await this.redis.get(sessionToId(session));
    if (!id) {
      return true;
    }
    await this.redis.del(sessionToId(session));
    await this.redis.del(idToSession(id));
    return true;
  }
  checkSession(session: string) {
    return this.redis.exists(sessionToId(session));
  }

  getNonce() {
    return randomBytes(512).toString('base64url').slice(128);
  }
  async createAccessToken(id: string) {
    const nonce = this.getNonce();
    const issuer = this.config.get('url')!;
    const ttl = this.config.get('cache.ttl.auth.token.access')!;
    const token = await this.jwt.sign({ id, nonce }, 'access', ttl, { issuer });
    return { token, ttl };
  }
  async createRefreshToken(id: string) {
    const nonce = this.getNonce();
    const issuer = this.config.get('url')!;
    const ttl = this.config.get('cache.ttl.auth.token.refresh')!;
    const token = await this.jwt.sign({ id, nonce }, 'refresh', ttl, {
      issuer,
    });
    return { token, ttl };
  }
  async invokeToken(
    id: string | bigint,
    token: string,
    type: 'access' | 'refresh',
  ) {
    const ttl =
      type === 'access'
        ? this.config.get('cache.ttl.auth.token.access')!
        : this.config.get('cache.ttl.auth.token.refresh')!;
    await this.redis.psetex(TOKEN(id, type), ttl, token);
    await this.redis.psetex(tokenToId(token), ttl, id.toString());
  }
  async revokeToken(token: string, type: 'access' | 'refresh') {
    const id = await this.redis.get(tokenToId(token));
    if (!id) {
      return true;
    }
    await this.redis.del(tokenToId(token), TOKEN(id, type));
    return true;
  }
  invokeCode(code: string, id: string | bigint) {
    const ttl = this.config.get('cache.ttl.auth.code')!;
    return this.redis.psetex(`AUTH::CODE::${code}`, ttl, id.toString());
  }
  async readTokenPairById(id: string) {
    const accessToken = await this.redis.get(TOKEN(id, 'access'));
    const refreshToken = await this.redis.get(TOKEN(id, 'refresh'));
    const accessTokenTTL = await this.redis.pttl(TOKEN(id, 'access'));
    const refreshTokenTTL = await this.redis.pttl(TOKEN(id, 'refresh'));
    return {
      accessToken: {
        token: accessToken,
        ttl: accessTokenTTL,
      },
      refreshToken: {
        token: refreshToken,
        ttl: refreshTokenTTL,
      },
    };
  }
  readIdBySession(session: string) {
    return this.redis.get(sessionToId(session));
  }
  readIdByCode(code: string) {
    return this.redis.get(`AUTH::CODE::${code}`);
  }
  readSessionById(id: string) {
    return this.redis.get(idToSession(id));
  }

  async login(data: LoginDto) {
    const valid = await this.account.verifyPassword(data.email, data.password);
    if (!valid) {
      return {
        ok: false,
        reason: '邮箱或密码错误',
      } as const;
    }
    const account = await this.prisma.account.findFirst({
      where: { email: data.email },
      select: {
        id: true,
      },
    });
    if (!account) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return {
      ok: true,
      id: account.id,
    } as const;
  }
  active(id: string | bigint) {
    return this.redis.exists(TOKEN(id, 'access'));
  }
  async kickout(id: string | bigint) {
    const session = await this.readSessionById(id.toString());
    if (session) {
      await this.revokeSession(session);
    }
    const { accessToken, refreshToken } = await this.readTokenPairById(
      id.toString(),
    );
    if (accessToken.token) {
      await this.revokeToken(accessToken.token, 'access');
    }
    if (refreshToken.token) {
      await this.revokeToken(refreshToken.token, 'refresh');
    }
    return true;
  }
}
