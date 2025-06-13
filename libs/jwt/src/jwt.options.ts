import { ConfigurableModuleBuilder } from '@nestjs/common';

export type JwtModuleOptions = {
  alg:
    | 'Ed25519'
    | 'EdDSA'
    | `${'HS' | 'PS' | 'RS' | 'ES'}${'256' | '384' | '512'}`;
  privateKey: string;
  publicKey: string;
};

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<JwtModuleOptions>()
    .setClassMethodName('forRoot')
    .build();
