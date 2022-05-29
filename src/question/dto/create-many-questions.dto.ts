import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";


export class CreateManyQuestionsDto {

    @IsNotEmpty()
    questions: CreateQuestionDto[];
}