import { RedisService } from '@liaoliaots/nestjs-redis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private SSO_PATH: string = process.env.SSO_PATH;
  private redis: Redis;

  constructor(private redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  localTokenActive(token: string) {
    return this.redis.exists(`TK::AT::${token}`);
  }
  ssoTokenActive(token: string) {
    return this.redis.exists(`TK::AT::${token}`);
  }
  getToken(localToken: string) {
    return this.redis.get(`TK::AT::${localToken}`);
  }
  async introspectByLocalToken(token: string) {
    const accessToken = await this.getToken(token);
    if (!accessToken) {
      throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
    }
    return this.introspect(accessToken);
  }
  async introspect(token: string) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set(
      'Authorization',
      `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64url')}`,
    );
    return fetch(`${process.env.SSO_PATH}/api/login/oauth/introspect`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        token: token,
        token_type_hint: 'access_token',
      }),
    })
      .then((resp) => resp.json())
      .then((body: TokenPayload) => {
        return body;
      })
      .then((body) => {
        if (!body.active) {
          throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
        }
        return body;
      });
  }

  getTokenPair(code: string) {
    const url = new URL(`${this.SSO_PATH}/api/login/oauth/access_token`);
    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        grant_type: process.env.grant_type ?? 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      }),
    })
      .then((resp) => resp.json())
      .then((body: TokenPair) => body)
      .catch((err: Fail) => {
        throw new HttpException(err.error_description, HttpStatus.BAD_REQUEST);
      });
  }
  async storageToken(id: string, accessToken: string, ttl: number) {
    const localToken = randomBytes(64).toString('base64url').slice(0, 32);
    await this.redis.psetex(`TK::AT::${accessToken}`, localToken, ttl);
    await this.redis.psetex(`TK::AT::${localToken}`, accessToken, ttl);
    await this.redis.psetex(`TOKEN::${localToken}`, id, ttl);
    await this.redis.psetex(`ID::TOKEN::${id}`, accessToken, ttl);
    return { localToken, ttl };
  }
  decodeToken(localToken: string) {
    return this.redis.get(`TOKEN::${localToken}`);
  }
}
