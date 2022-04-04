import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { Token } from './entities';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }


    async signup(signupDto: SignupDto): Promise<Token> {
        const user = await this.prisma.user.create({
            data: {
                email: signupDto.email,
                password: await this.generateHash(signupDto.password)
            }
        })

        const tokens = await this.generateTokens(user.id, user.email)
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
        return tokens
    }

    async signin(signinDto: SigninDto): Promise<Token> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signinDto.email
            }
        })

        const tokens = await this.generateTokens(user.id, user.email)
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
        return tokens
    }

    async logout(userId: number) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                refreshToken: {
                    not: null
                }
            },
            data: {
                refreshToken: null
            }
        })
    }

    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user || !user.refreshToken) throw new ForbiddenException("Access Denied")

        if (await bcrypt.compare(refreshToken, user.refreshToken)) {
            const tokens = await this.generateTokens(user.id, user.email)
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
            return tokens
        }
    }


    private async updateRefreshTokenHash(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.generateHash(refreshToken)
        console.log(hashedRefreshToken)
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: hashedRefreshToken
            }
        })
    }


    private async generateHash(data: string): Promise<string> {
        return bcrypt.hash(data, 10)
    }

    private async generateTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, { secret: 'at-secret', expiresIn: 60 * 60 * 7 }), // one week
            this.jwtService.signAsync({
                sub: userId,
                email
            }, { secret: 'rf-secret', expiresIn: 60 * 60 * 7 }) // one week

        ])

        return {
            accessToken,
            refreshToken
        }
    }

}
