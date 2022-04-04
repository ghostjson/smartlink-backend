import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateFormDto {

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    validity: Date;

}