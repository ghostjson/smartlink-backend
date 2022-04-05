import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    phone: string;


    @IsNotEmpty()
    @IsString()
    password: string;
}