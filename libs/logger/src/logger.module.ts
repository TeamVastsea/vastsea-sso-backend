import { ConfigModule, ConfigService } from '@app/config';
import { Inject, LoggerService, Module, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { WinstonLoggerService as WinstonLoggerService } from './logger.service';
import { Logger } from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useClass: WinstonLoggerService,
    }),
  ],
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class LoggerModule implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
  ) {}
  onModuleInit() {
    this.logger.log(`Winston Logger Init Success!`);
  }
}
