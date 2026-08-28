import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route as bypassing auth guards once those guards are added.
 * No guard reads this yet — wire it up when auth lands.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
