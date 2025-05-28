import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@app/prisma';
import { V2Auth } from './v2/auth.controller';
import { V2AuthService } from './v2/auth.service';

@Module({
  imports: [
    // MailerModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     return {
    //       transport: config.get('email.transport'),
    //     };
    //   },
    // }),
  ],
  controllers: [V2Auth, AuthController],
  providers: [V2AuthService, AuthService, PrismaService],
  exports: [AuthService, V2AuthService],
})
export class AuthModule {}
