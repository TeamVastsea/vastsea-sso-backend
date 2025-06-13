import { ConfigModule } from '@app/config';
import { LoggerModule as WinstonLogger } from '@app/logger';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

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
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
