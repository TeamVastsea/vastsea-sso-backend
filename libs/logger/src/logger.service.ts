import { ConfigService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Injectable()
export class WinstonLoggerService implements WinstonModuleOptionsFactory {
  constructor(private config: ConfigService) {}
  async createTransport(level: string) {
    return new winston.transports.DailyRotateFile({
      level,
      dirname: await this.config.get('logger.dirname'),
      filename: await this.config.get('logger.filename'),
      datePattern: await this.config.get('logger.datePattern'),
      maxSize: await this.config.get('logger.maxSize'),
    });
  }
  async createWinstonModuleOptions() {
    const levels = await this.config.get('logger.level');
    const appName = await this.config.get('appName');
    const transports = Promise.all(
      levels.map((level) => this.createTransport(level)),
    );
    return {
      transports: [
        ...(await transports),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(appName ?? 'Nest', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    };
  }
}
