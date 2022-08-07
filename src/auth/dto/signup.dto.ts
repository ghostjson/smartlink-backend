import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * Signup Dto
 */
export class SignupDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
