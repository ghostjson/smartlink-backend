import { IsNotEmpty, IsObject, IsString } from "class-validator";

/**
 * CreateFormDto
 */
export class CreateFormDto {

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    validity: Date;

    @IsObject()
    style: object;

    @IsString()
    name: string;

}