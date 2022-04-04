import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Question } from '@prisma/client';
import { GetCurrentUserId } from 'src/decorators';
import { SuccessResponse } from 'src/utility/responses';
import { CreateQuestionDto } from './dto';
import { QuestionService } from './question.service';

@Controller('/api/v1/questions')
export class QuestionController {

    constructor(private questionService: QuestionService) { }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createQuestion(@GetCurrentUserId() userId: number, @Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
        return await this.questionService.createQuestion(userId, createQuestionDto)
    }

    @Delete('/:questionId')
    @HttpCode(HttpStatus.OK)
    async deleteQuestion(@GetCurrentUserId() userId: number, @Param('questionId') questionId: number): Promise<SuccessResponse> {
        if (this.questionService.deleteQuestion(userId, Number(questionId))) {
            return SuccessResponse.put()
        }
    }

}
