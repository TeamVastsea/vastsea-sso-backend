import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

if (MODE === 'dev') {
  if (existsSync('.dev.env')) {
    config({ path: '.dev.env' });
  }
} else {
  if (existsSync('.prod.env')) {
    config({ path: '.prod.env' });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
