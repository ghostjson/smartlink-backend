import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/guards';
import { SuccessResponse } from 'src/utility/responses';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { Token } from './entities';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() signupDto: SignupDto): Promise<Token> {
        return this.authService.signup(signupDto)
    }

    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin() {

    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: number): Promise<SuccessResponse> {
        await this.authService.logout(userId)
        return SuccessResponse.put()
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userId, refreshToken)
    }

}
