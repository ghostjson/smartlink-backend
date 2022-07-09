import { SetMetadata } from '@nestjs/common';

/**
 * Public decorator
 *
 * decorator used to make a controller public (without the need for authorization to access it)
 */
export const Public = () => SetMetadata('isPublic', true);
