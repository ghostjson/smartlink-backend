import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateResponseDto {
    @IsObject()
    @IsNotEmpty()
    answers: object;

    @IsString()
    name: string;

    @IsString()
    number: string;

    @IsObject()
    meta: object;

    @IsNumber()
    totalScore: number;
}
