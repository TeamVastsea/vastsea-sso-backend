import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { V2AuthService } from './auth.service';
import { ClientService } from '../../client/client.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { RefreshToken } from '../dto/refresh-token';
import { JwtService } from '@app/jwt';
import { findLast, isNil } from 'ramda';
import { Auth } from '@app/decorator';
import { Token } from '../token.decorator';

@Controller('/v2/auth')
export class V2Auth {
  constructor(
    private authService: V2AuthService,
    private clientService: ClientService,
    private jwt: JwtService,
  ) {}

  @Get('/session')
  async getTokenBySession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = req.cookies['session-state'];
    if (!session) {
      throw new HttpException('session-state 不合法', HttpStatus.UNAUTHORIZED);
    }
    const ok = await this.authService.checkSession(session);
    if (!ok) {
      res.clearCookie('session-state');
      res.status(HttpStatus.UNAUTHORIZED);
      throw new HttpException('session-state 过期', HttpStatus.UNAUTHORIZED);
    }
    const id = await this.authService.readIdBySession(session);
    if (!id) {
      res.clearCookie('session-state');
      res.status(HttpStatus.UNAUTHORIZED);
      throw new HttpException('session-state 过期', HttpStatus.UNAUTHORIZED);
    }
    res.status(HttpStatus.OK);
    return this.authService.readTokenPairById(id);
  }

  @Get('/token')
  async getToken(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    if (req.cookies['session-state']) {
      res.status(HttpStatus.OK);
      return this.getTokenBySession(req, res);
    }
    const id = await this.authService.readIdByCode(code);
    if (!id) {
      throw new HttpException('授权码过期', HttpStatus.BAD_REQUEST);
    }
    const accessToken = await this.authService.createAccessToken(id);
    const refreshToken = await this.authService.createRefreshToken(id);
    const session = this.authService.createSession();
    await this.authService.invokeSession(id, session);
    await this.authService.invokeToken(id, accessToken.token, 'access');
    await this.authService.invokeToken(id, refreshToken.token, 'refresh');
    res.cookie('session-state', session, {
      maxAge: accessToken.ttl,
    });
    res.status(HttpStatus.OK);
    return { accessToken, refreshToken };
  }

  @Post('/code')
  async getCode(
    @Query('clientId') clientId: string,
    @Body() body: LoginDto,
    @Res() res: Response,
  ) {
    const client = await this.clientService.findClient({ clientId });
    if (!client) {
      const url = new URL(process.env.COMMON_ERROR_REDIRECT);
      url.searchParams.set('ok', 'false');
      url.searchParams.set('reason', '客户端不存在');
      return res.redirect(url.toString());
    }
    const url = new URL(client.redirect);
    const handle = await this.authService.login(body);
    if (!handle.ok) {
      url.searchParams.set('ok', 'false');
      url.searchParams.set('reason', handle.reason);
      return res.redirect(url.toString());
    }
    const id = handle.id;
    const code = this.authService.createCode();
    await this.authService.invokeCode(code, id);
    url.searchParams.set('ok', 'true');
    url.searchParams.set('code', code);
    return res.redirect(url.toString());
  }
  @Post('/token/refresh')
  async refreshToken(@Body() body: RefreshToken) {
    try {
      const { id } = this.jwt.decode<{ id: string }>(body.refreshToken);
      if (isNil(id)) {
        throw new HttpException('Token 不合法', HttpStatus.BAD_REQUEST);
      }
      const { accessToken, refreshToken } =
        await this.authService.readTokenPairById(id);
      if (refreshToken.token !== body.refreshToken) {
        throw new HttpException('刷新令牌不合法', HttpStatus.BAD_REQUEST);
      }
      if (accessToken.ttl === 0) {
        await this.authService.revokeToken(body.refreshToken, 'refresh');
      }
      const newAccessToken = await this.authService.createAccessToken(id);
      const newRefreshToken = await this.authService.createRefreshToken(id);
      let session = await this.authService.readSessionById(id);
      if (!session) {
        session = this.authService.createSession();
      }
      await this.authService.invokeSession(id, session);
      await this.authService.invokeToken(id, newAccessToken.token, 'access');
      await this.authService.invokeToken(id, newRefreshToken.token, 'refresh');
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new HttpException('Token 不合法', HttpStatus.BAD_REQUEST);
    }
  }
  @Auth()
  @Delete('/token')
  async logout(
    @Token() token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!token) {
      res.clearCookie('session-state');
      res.status(HttpStatus.OK);
      return;
    }
    try {
      const { id } = this.jwt.decode<{ id: string }>(token);
      if (!id) {
        res.clearCookie('session-state');
        res.status(HttpStatus.OK);
      }
      const session = await this.authService.readSessionById(id);
      if (session) {
        await this.authService.revokeSession(session);
      }
      const { accessToken, refreshToken } =
        await this.authService.readTokenPairById(id);
      if (accessToken.token) {
        await this.authService.invokeToken(id, accessToken.token, 'access');
      }
      if (refreshToken.token) {
        await this.authService.invokeToken(id, refreshToken.token, 'refresh');
      }
      res.status(HttpStatus.OK);
    } catch {
    } finally {
      res.clearCookie('session-state');
      res.status(HttpStatus.OK);
    }
  }
}
