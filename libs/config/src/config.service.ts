import { Inject, Injectable } from '@nestjs/common';
import { ConfigOption, MODULE_OPTIONS_TOKEN } from './config.options';
import { Path, pathGet, PathValue } from 'object-standard-path';

@Injectable()
export class ConfigService {
  private config: Promise<Config>;
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: ConfigOption) {
    this.config = this.options.loader();
  }
  async get<T extends Path<Config>>(path: T): Promise<PathValue<Config, T>> {
    const conf = await this.config;
    return pathGet(conf, path) as PathValue<Config, T>;
  }
}
