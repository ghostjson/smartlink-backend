import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators';
import { RefreshTokenGuard } from 'src/guards';
import { SuccessResponse } from 'src/utility/responses';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { FacebookSigninDto } from './dto/facebook-signin.dto';
import { Token } from './entities';

/**
 * Authentication controller
 * 
 * handles all logic related to authentication and authorization
 */
@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    /**
     * Signup controller
     * 
     * @param signupDto Signup DTO
     * @returns returns a Token object
     */
    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: SignupDto): Promise<Token> {

        if(await this.authService.isUserExists(signupDto.phone)){
            throw new ConflictException("User already exists")
        }

        return this.authService.signup(signupDto)
    }

    /**
     * Signup controller
     * 
     * @param signinDto Signin DTO
     * @returns returns a Token object
     */
    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() signinDto: SigninDto): Promise<Token> {
        return this.authService.signin(signinDto)
    }

    /**
     * Facebook signin controller
     * 
     * @param facebookSigninDto FacebookSigninDto
     * @returns returns a Token object
     */
    @Public()
    @Post('/facebook')
    @HttpCode(HttpStatus.OK)
    signinUsingFacebook(@Body() facebookSigninDto: FacebookSigninDto): Promise<Token> {
        return this.authService.signinUsingFacebook(facebookSigninDto)
    }

    /**
     * Logout controller
     * 
     * @param userId Id of the authorized user
     * @returns SuccessResponse object
     */
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: number): Promise<SuccessResponse> {
        await this.authService.logout(userId)
        return SuccessResponse.put()
    }

    /**
     * Refresh token
     * @deprecated
     * 
     * TODO: Is not working, should be fixed.
     * 
     * @param userId Id of the authorized user
     * @param refreshToken refresh token of the authorized user
     * @returns return new pair of tokens
     */
    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userId, refreshToken)
    }

}
