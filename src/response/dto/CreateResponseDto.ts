import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateResponseDto {
    @IsArray()
    @IsNotEmpty()
    answers: any;

    @IsString()
    name: string;

    @IsString()
    number: string;

    @IsObject()
    meta: object;

    @IsNumber()
    totalScore: number;
}
