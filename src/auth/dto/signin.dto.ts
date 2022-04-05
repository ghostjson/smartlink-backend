import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {

    @IsNotEmpty()
    phone: string;


    @IsNotEmpty()
    @IsString()
    password: string;
}