import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const TokenPayload = createParamDecorator((_, context) => {
  const http = context.switchToHttp();
  const req: SuperReq & Request = http.getRequest();
  return req.user;
});
export const Token = createParamDecorator((_, ctx) => {
  const http = ctx.switchToHttp();
  const req: SuperReq & Request = http.getRequest();
  return req.headers.authorization?.split(' ')[1];
});
