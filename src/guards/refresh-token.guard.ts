import { AuthGuard } from '@nestjs/passport';

/**
 * Refresh token guard
 */
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
}
