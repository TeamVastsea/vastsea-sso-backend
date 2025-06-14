import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProfile = z.object({
  id: z.string(),
  email: z.string(),
  nick: z.string(),
  bio: z.string(),
});

export class CreateProfile extends createZodDto(createProfile) {}
