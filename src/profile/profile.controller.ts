import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TokenPayload } from '../auth/token.decorator';
import { isNil, isNotNil } from 'ramda';
import { Public } from '../auth/auth.decorator';
import { UpdateProfile } from './dto/update-profile.dto';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { createHash } from 'crypto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/avatar')
  async uploadAvatar(
    @TokenPayload() user: UserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filehash = createHash('sha512')
      .update(file.buffer)
      .digest('hex')
      .toLowerCase();
    await this.profileService.uploadAvatar(user.id, file.buffer, filehash);
    return filehash;
  }
  @Post('/avatar/:hash')
  @Public()
  getAvatar(@Param('hash') hash: string) {
    return this.getAvatar(hash);
  }

  @Patch('/')
  async patchProfile(
    @TokenPayload() user: UserPayload,
    @Body() body: UpdateProfile,
  ) {
    return this.profileService.updateProfile(user.id, body);
  }

  @Get('/')
  async getProfile(@TokenPayload() user: UserPayload) {
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
        createAt: remoteProfile.createdTime ?? new Date().toLocaleDateString(),
      });
    }
    return this.profileService.getProfile(user.id);
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
      createAt: remoteProfile.createdTime ?? new Date().toLocaleDateString(),
    });
    return this.profileService.getProfile(id);
  }
}
