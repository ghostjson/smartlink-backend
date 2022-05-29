import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

/**
 * CreateManyQuestionDto
 */
export class CreateManyQuestionsDto {

    @IsNotEmpty()
    questions: CreateQuestionDto[];

    @IsNumber()
    @IsNotEmpty()
    formId: number;
}