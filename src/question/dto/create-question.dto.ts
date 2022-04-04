import { IsNotEmpty, isNotEmpty, IsNumber, IsObject, IsString, isString } from "class-validator";


export class CreateQuestionDto {

    @IsString()
    @IsNotEmpty()
    question: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsObject()
    content: object;

    @IsNumber()
    @IsNotEmpty()
    formId: number;

}