import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * signin DTO
 */
export class SigninDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
