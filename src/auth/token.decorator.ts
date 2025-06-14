import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Token = createParamDecorator((_, context) => {
  const http = context.switchToHttp();
  const req: SuperReq & Request = http.getRequest();
  return req.user;
});
