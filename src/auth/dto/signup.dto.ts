import { IsEmail, IsNotEmpty, IsString } from "class-validator";
/**
 * Signup Dto
 */
export class SignupDto {

    @IsNotEmpty()
    phone: string;


    @IsNotEmpty()
    @IsString()
    password: string;
}