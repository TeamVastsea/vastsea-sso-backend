import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { IS_PUB } from './auth.decorator';
import { Request } from 'express';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private refelctor: Reflector,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.refelctor.getAllAndOverride<boolean>(IS_PUB, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) {
      return true;
    }
    const http = context.switchToHttp();
    const req: SuperReq & Request = http.getRequest();
    const token = this.getToken(req);
    if (!token) {
      throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
    }
    const localTokenActive = await this.authService.localTokenActive(token);
    if (!localTokenActive) {
      throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
    }
    const ssoToken = await this.authService.getToken(token);
    if (!ssoToken) {
      throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
    }
    if (!(await this.authService.ssoTokenActive(ssoToken))) {
      throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
    }
    const id = await this.authService.decodeToken(token);
    if (!id) {
      throw new HttpException('令牌过期', HttpStatus.UNAUTHORIZED);
    }
    req.user = { id };
    return true;
  }
  private getToken(req: Request) {
    const auth = req.headers.authorization;
    if (!auth) {
      return null;
    }
    const [_, token] = auth.split(' ');
    return token;
  }
}
