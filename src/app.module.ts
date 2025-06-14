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
import { readFileSync } from 'fs';
import { join } from 'path';

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
  async onModuleInit() {}
}
