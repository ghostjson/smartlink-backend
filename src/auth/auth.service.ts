import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { Token } from './entities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FacebookSigninDto } from './dto/facebook-signin.dto';
import axios from 'axios';

/**
 * AuthService
 *
 * Handles all logic related to authentication and authorization
 */
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
                email: signupDto.email,
                password: await this.generateHash(signupDto.password),
            },
        });

        const tokens = await this.generateTokens(user.id, user.email);
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
        return tokens;

        return null;
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
                email: signinDto.email,
            },
        });

        if (await bcrypt.compare(signinDto.password, user.password)) {
            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
            return tokens;
        } else {
            throw new UnauthorizedException('Incorrect credentials');
        }
    }

    /**
     * Signin using facebook access token
     * @param facebookSigninDto
     */
    async signinUsingFacebook(facebookSigninDto: FacebookSigninDto): Promise<Token> {
        const fbToken = facebookSigninDto.accessToken;
        let user = null;
        try {
            const response = await axios.post(
                `https://graph.facebook.com/me?fields=name,picture&access_token=${fbToken}`,
            );

            // check if the user already exists
            if (await this.isUserExists(response.data.id)) {
                // if exist query it from the database
                user = await this.prisma.user.findUnique({
                    where: {
                        facebookId: response.data.id,
                    },
                });
            } else {
                // if not exist, create a new user
                user = await this.prisma.user.create({
                    data: {
                        name: response.data.name,
                        facebookId: response.data.id,
                        profile: response.data.picture.data.url,
                    },
                });
            }
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException();
        }

        const token = await this.generateTokens(user.id, user.facebookId);
        return token;
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
                    not: null,
                },
            },
            data: {
                refreshToken: null,
            },
        });
    }

    /**
     * Refresh token
     *
     * Refresh the current access token
     * @param userId User ID of the user
     * @param refreshToken Refresh token of the user
     * @returns returns new set of tokens
     * @deprecated
     */
    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

        if (await bcrypt.compare(refreshToken, user.refreshToken)) {
            // const tokens = await this.generateTokens(user.id, user.phone)
            // await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
            // return tokens
            return null;
        }
    }

    /**
     * Is User Exists
     *
     * Function to check if the user already exists in the database with given phone number
     * @param identifier A unique id of a user can be email or facebookId
     * @returns true if user exists with this phone number otherwise return false
     */
    async isUserExists(identifier: string): Promise<Boolean> {
        const userExist = await this.prisma.user.count({
            where: {
                OR: [
                    {
                        facebookId: identifier,
                    },
                    {
                        email: identifier,
                    },
                ],
            },
        });

        return userExist > 0;
    }

    /**
     * Update Refresh Token
     *
     * Function to update the refresh token on the database of the given user
     * @param userId User Id of the user to which the accesstoken to be refreshed
     * @param refreshToken current refresh token of the user
     */
    private async updateRefreshTokenHash(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.generateHash(refreshToken);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hashedRefreshToken,
            },
        });
    }

    /**
     * Generate hash
     *
     * Generate hash from the given data
     * @param data data to be hashed
     * @returns return hashed version of the data
     */
    private async generateHash(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    /**
     * Generate tokens
     *
     * Genreate and returns access token and refresh token for a given user
     * @param userId Id of the user
     * @param identifier an id which a user can be uniquely identfied -
     *                   can be facebookId or email ID of the user
     * @returns returns tokens
     */
    private async generateTokens(userId: number, identifier: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    identifier,
                },
                { secret: 'at-secret', expiresIn: 60 * 60 * 7 },
            ), // one week
            this.jwtService.signAsync(
                {
                    sub: userId,
                    identifier,
                },
                { secret: 'rf-secret', expiresIn: 60 * 60 * 7 },
            ), // one week
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
