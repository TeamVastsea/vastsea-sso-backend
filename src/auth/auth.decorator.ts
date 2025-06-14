import { SetMetadata } from '@nestjs/common';

export const IS_PUB = Symbol('');

export const Public = () => SetMetadata(IS_PUB, true);
