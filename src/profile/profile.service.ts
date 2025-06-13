import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProfile } from './dto/create-profile.dto';
import { isNil, isNotEmpty } from 'ramda';
import { UpdateProfile } from './dto/update-profile.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@app/config';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class ProfileService {
  private redis: Redis;
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
    private config: ConfigService,
  ) {
    const r = this.redisService.getOrNil();
    if (!r) {
      throw new Error('Redis Can not connect');
    }
    this.redis = r;
  }

  async createProfile(data: CreateProfile) {
    const profile = await this.prisma.profile.findFirst({
      where: {
        email: data.email,
      },
    });
    if (isNotEmpty(profile)) {
      return profile;
    }
    return this.prisma.profile.create({
      data: {
        ...data,
        avatar: '',
      },
    });
  }

  updateProfile(email: string, profile: UpdateProfile) {
    return this.prisma.profile.update({
      where: { email },
      data: {
        ...profile,
      },
    });
  }

  getProfile(email: string) {
    return this.prisma.profile.findFirst({
      where: { email },
    });
  }

  async uploadAvatar(email: string, file: Buffer, hash: string) {
    if (!(await this.redis.exists(`AVATAR::${hash}::REF`))) {
      const path = join(process.env.BASE_PATH, hash);
      writeFileSync(path, file);
    }
    const profile = await this.prisma.profile.findFirst({
      where: { email },
      select: { avatar: true },
    });
    if (isNil(profile)) {
      throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);
    }
    if (profile.avatar.endsWith(hash)) {
      await this.redis.decr(`AVATAR::${hash}::REF`);
      const cur = await this.redis.get(`AVATAR::${hash}::REF`);
      if (!cur) {
        const path = join(process.env.BASE_PATH, hash);
        unlinkSync(path);
      }
    }
    await this.redis.incr(`AVATAR::${hash}::REF`);
    const url = await this.config.get('url');
    await this.prisma.profile.update({
      where: { email },
      data: {
        avatar: `${url}/${hash}`,
      },
    });
  }
}
