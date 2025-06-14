import { ConfigModule } from '@app/config';
import { LoggerModule as WinstonLogger } from '@app/logger';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AuthModule } from './auth/auth.module';
import AuthGuard from './auth/auth.guard';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      loader: () => {
        return Promise.resolve({
          url: '',
          logger: {
            level: ['debug'],
            dirname: `logs`,
            filename: `%DATE%-error.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
          },
        });
      },
      global: true,
    }),
    RedisModule.forRootAsync({
      useFactory() {
        return {
          config: {
            path: process.env.BASE_PATH,
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
export class AppModule {}
