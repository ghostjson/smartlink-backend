import { IsNotEmpty, IsString } from "class-validator"

export class FacebookSigninDto {

    @IsString()
    @IsNotEmpty()
    accessToken: string;

}