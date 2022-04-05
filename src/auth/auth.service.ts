import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { Token } from './entities';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

/**
 * AuthService
 * 
 * Handles all logic related to authentication and authorization
 */
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }


    /**
     * signup
     * 
     * used to create a new user, generate and return new pair of tokens
     * @param signupDto SignupDto object
     * @returns Token object
     */
    async signup(signupDto: SignupDto): Promise<Token> {
        const user = await this.prisma.user.create({
            data: {
                phone: signupDto.phone,
                password: await this.generateHash(signupDto.password)
            }
        })

        const tokens = await this.generateTokens(user.id, user.phone)
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
        return tokens
    }

    /**
     * Signin
     * 
     * used to generate tokens from given credentials
     * @param signinDto Signin DTO
     * @returns Token object
     */
    async signin(signinDto: SigninDto): Promise<Token> {
        const user = await this.prisma.user.findUnique({
            where: {
                phone: signinDto.phone,
            }
        })

        if (bcrypt.compare(signinDto.password, user.password)) {
            const tokens = await this.generateTokens(user.id, user.phone)
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
            return tokens
        } else {
            throw new UnauthorizedException('Incorrect credentials')
        }


    }

    /**
     * Logout
     * 
     * logout user
     * @param userId User ID of user to be logout
     */
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

    /**
     * Refresh token
     * 
     * Refresh the current access token
     * @param userId User ID of the user
     * @param refreshToken Refresh token of the user
     * @returns returns new set of tokens
     */
    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user || !user.refreshToken) throw new ForbiddenException("Access Denied")

        if (await bcrypt.compare(refreshToken, user.refreshToken)) {
            const tokens = await this.generateTokens(user.id, user.phone)
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
            return tokens
        }
    }


    /**
     * Update Refresh Token
     * 
     * Function to update the refresh token on the database of the given user
     * @param userId User Id of the user to which the accesstoken to be refreshed
     * @param refreshToken current refresh token of the user
     */
    private async updateRefreshTokenHash(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.generateHash(refreshToken)
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: hashedRefreshToken
            }
        })
    }


    /**
     * Generate hash
     * 
     * Generate hash from the given data
     * @param data data to be hashed
     * @returns return hashed version of the data
     */
    private async generateHash(data: string): Promise<string> {
        return bcrypt.hash(data, 10)
    }

    /**
     * Generate tokens
     * 
     * Genreate and returns access token and refresh token for a given user
     * @param userId Id of the user
     * @param phone Phone number of the user
     * @returns returns tokens
     */
    private async generateTokens(userId: number, phone: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                phone
            }, { secret: 'at-secret', expiresIn: 60 * 60 * 7 }), // one week
            this.jwtService.signAsync({
                sub: userId,
                phone
            }, { secret: 'rf-secret', expiresIn: 60 * 60 * 7 }) // one week

        ])

        return {
            accessToken,
            refreshToken
        }
    }

}
