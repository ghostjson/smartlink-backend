import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Question } from '@prisma/client';
import { GetCurrentUserId } from 'src/decorators';
import { SuccessResponse } from 'src/utility/responses';
import { CreateQuestionDto } from './dto';
import { CreateManyQuestionsDto } from './dto/create-many-questions.dto';
import { QuestionService } from './question.service';

/**
 * QuestionController
 *
 * controller responsible for questions CRUD
 */
@Controller('/api/v1/questions')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    /**
     * add a new question for a form
     * @param userId user id of the authorized user
     * @param createQuestionDto CreateQuestionDto
     * @returns returns newly created Question
     */
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createQuestion(
        @GetCurrentUserId() userId: number,
        @Body() createQuestionDto: CreateQuestionDto,
    ): Promise<Question> {
        return await this.questionService.createQuestion(userId, createQuestionDto);
    }

    @Post('/many')
    @HttpCode(HttpStatus.CREATED)
    async createManyQuestions(
        @GetCurrentUserId() userId: number,
        @Body() createManyQuestionsDto: CreateManyQuestionsDto,
    ): Promise<any> {
        return await this.questionService.createManyQuestions(userId, createManyQuestionsDto);
    }

    /**
     * remove a quetsion from a form
     * @param userId user id of the user
     * @param questionId question id which to be removed
     * @returns returns ScuccessResponse object
     */
    @Delete('/:questionId')
    @HttpCode(HttpStatus.OK)
    async deleteQuestion(
        @GetCurrentUserId() userId: number,
        @Param('questionId') questionId: number,
    ): Promise<SuccessResponse> {
        if (this.questionService.deleteQuestion(userId, Number(questionId))) {
            return SuccessResponse.put();
        }
    }
}
