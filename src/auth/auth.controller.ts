import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    @Post('/signup')
    signup(@Body() signupDto: SignupDto){
        this.authService.signup(signupDto)
    }

    @Post('/signin')
    signin(){

    }

    @Post('/logout')
    logout(){

    }

    @Post('/refresh')
    refreshToken(){

    }

}
