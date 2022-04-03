import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService){

    }

    signup(signupDto: SignupDto){
        const user = this.prisma.user.create({
            data: {
                email: signupDto.email,
                password: signupDto.password
            }
        })
    }

    signin(){

    }

    logout(){

    }

    refreshToken(){

    }
}
