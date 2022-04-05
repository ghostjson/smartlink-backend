import { IsNotEmpty, IsString } from "class-validator";

/**
 * CreateFormDto
 */
export class CreateFormDto {

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    validity: Date;

}