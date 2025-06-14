import { ConfigModule, ConfigService } from '@app/config';
import { LoggerModule as WinstonLogger } from '@app/logger';
import { Module, OnModuleInit } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AuthModule } from './auth/auth.module';
import AuthGuard from './auth/auth.guard';
import { PrismaModule } from 'nestjs-prisma';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import assert from 'assert';

@Module({
  imports: [
    ConfigModule.forRoot({
      loader: () => {
        return JSON.parse(
          readFileSync(join(__dirname, '../config/config.json')).toString(),
        );
      },
      global: true,
    }),
    RedisModule.forRootAsync({
      useFactory() {
        return {
          config: {
            path: process.env.REDIS,
          },
        };
      },
    }),
    WinstonLogger,
    ProfileModule,
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private config: ConfigService) {}
  async onModuleInit() {
    const ROOT = join(__dirname);
    assert(existsSync(join(ROOT, '../config/config.json')), '未找到配置文件');
    assert(Boolean(await this.config.get('url')), 'Url 配置项不存在');
    assert(Boolean(await this.config.get('logger')), 'Logger 配置项不存在');
    assert(process.env.CLIENT_ID, '环境变量: CLIENT_ID 不存在');
    assert(process.env.CLIENT_SECRET, '环境变量: CLIENT_SECRET 不存在');
    assert(process.env.SSO_PATH, '环境变量: SSO_PATH 不存在');
    assert(process.env.grant_type, '环境变量: grant_type 不存在');
    assert(process.env.REDIS, '环境变量: REDIS 不存在');
  }
}
