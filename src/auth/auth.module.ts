import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

/**
 * AuthModule
 */
@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}
