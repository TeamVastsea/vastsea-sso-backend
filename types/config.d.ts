declare type LoggerLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'sill';

declare interface Config {
  /** */
  url: string;
  appName?: string;
  logger: {
    level: LoggerLevel[];
    dirname: string;
    filename: string;
    datePattern: string;
    maxSize: string;
  };
}
