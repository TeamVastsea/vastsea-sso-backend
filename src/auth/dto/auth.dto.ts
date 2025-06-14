import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const authDTO = z.object({
  code: z.string(),
});

export class AuthDTO extends createZodDto(authDTO) {}
