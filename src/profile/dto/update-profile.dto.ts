import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateProfile = z.object({
  nick: z.string(),
  bio: z.string(),
});

export class UpdateProfile extends createZodDto(updateProfile) {}
