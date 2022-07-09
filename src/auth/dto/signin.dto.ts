import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * signin DTO
 */
export class SigninDto {
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
