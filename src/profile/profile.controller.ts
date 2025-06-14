import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Token } from '../auth/token.decorator';
import { isNil, isNotNil } from 'ramda';
import { Public } from '../auth/auth.decorator';
import { UpdateProfile } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('/')
  async patchProfile(@Token() user: UserPayload, @Body() body: UpdateProfile) {
    return this.profileService.updateProfile(user.id, body);
  }

  @Get('/')
  async getProfile(@Token() user: UserPayload) {
    const localProfile = await this.profileService.getProfile(user.id);
    if (isNil(localProfile)) {
      const remoteProfile = await this.profileService.getRemoteProfileById(
        user.id,
      );
      if (isNil(remoteProfile)) {
        throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
      }
      return this.profileService.createProfile({
        email: remoteProfile.email!,
        id: remoteProfile.id!,
        nick: remoteProfile.displayName ?? remoteProfile.email ?? '',
        bio: remoteProfile.bio ?? '',
      });
    }
    return localProfile;
  }

  @Public()
  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    const localProfile = await this.profileService.getProfile(id);
    if (isNotNil(localProfile)) {
      return localProfile;
    }
    const remoteProfile = await this.profileService.getRemoteProfileById(id);
    if (isNil(remoteProfile)) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    await this.profileService.createProfile({
      email: remoteProfile.email!,
      id: remoteProfile.id!,
      nick: remoteProfile.displayName ?? remoteProfile.email ?? '',
      bio: remoteProfile.bio ?? '',
    });
    return localProfile;
  }
}
