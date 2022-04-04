import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto';

@Injectable()
export class QuestionService {

    constructor(private prisma: PrismaService) { }

    async createQuestion(userId: number, createQuestionDto: CreateQuestionDto): Promise<Question> {
        const formExists = await this.prisma.form.count({
            where: {
                id: createQuestionDto.formId,
                userId: userId
            }
        })

        if (formExists > 0) {
            const question = await this.prisma.question.create({
                data: {
                    question: createQuestionDto.question,
                    type: createQuestionDto.type,
                    content: createQuestionDto.content,
                    formId: createQuestionDto.formId
                }
            })

            return question
        } else {
            throw new NotFoundException('Given form is not existed')
        }
    }

    async deleteQuestion(userId: number, questionId: number): Promise<Boolean> {
        const question = await this.prisma.question.findUnique({
            where: {
                id: questionId
            },
        })

        if (question === null) {
            throw new NotFoundException('Not Found')
        }
        const parentForm = await this.prisma.form.findUnique({
            where: {
                id: question.formId
            }
        })

        if (parentForm.userId === userId) {
            await this.prisma.question.delete({
                where: {
                    id: questionId
                }
            })

            return true
        } else {
            throw new BadRequestException('No question is associated with question id')
        }

    }

}
