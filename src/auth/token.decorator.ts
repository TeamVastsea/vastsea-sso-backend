import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Token = createParamDecorator((_, ctx) => {
  const http = ctx.switchToHttp();
  const req: Request = http.getRequest();
  const [, token] = req.headers.authorization?.split(' ') ?? [null, null];
  return token;
});
