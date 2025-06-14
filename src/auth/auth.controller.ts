import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('/token')
  async getToken(@Query('code') code: string) {
    const tokenPair = await this.authService.getTokenPair(code);
    const { sub } = await this.authService.introspect(tokenPair.access_token);
    const localToken = await this.authService.storageToken(
      sub,
      tokenPair.access_token,
      tokenPair.expires_in,
    );
    return { localToken: localToken.localToken, id: sub };
  }
}
