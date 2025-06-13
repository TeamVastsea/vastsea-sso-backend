import { ConfigurableModuleBuilder } from '@nestjs/common';

type ConfigLoader = () => Promise<Config>;
export type ConfigOption = { loader: ConfigLoader };

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigOption>()
    .setClassMethodName('forRoot')
    .setExtras<{ global: boolean }>({ global: false }, (def, ext) => {
      return {
        ...def,
        global: ext.global,
      };
    })
    .build();
