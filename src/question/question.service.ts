import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManyQuestionsDto, CreateQuestionDto } from './dto';

/**
 * QuestionService
 * 
 * Service responsible for handling all business logic related to questions 
 */
@Injectable()
export class QuestionService {

    constructor(private prisma: PrismaService) { }

    /**
     * Create a new question for a form
     * @param userId user id of the user
     * @param createQuestionDto CreateQuestionDto
     * @returns reutrn newly created question
     */
    async createQuestion(userId: number, createQuestionDto: CreateQuestionDto): Promise<Question> {
        const formExists = await this.prisma.form.count({
            where: {
                id: createQuestionDto.formId,
                userId: userId
            }
        })

        // check if the form exists
        if (formExists > 0) { // if exists add question to the form
            const question = await this.prisma.question.create({
                data: {
                    question: createQuestionDto.question,
                    type: createQuestionDto.type,
                    content: createQuestionDto.content,
                    formId: createQuestionDto.formId
                }
            })

            return question
        } else { // otherwise raise not found exception
            throw new NotFoundException('Given form is not existed')
        }
    }


    /**
     * Create a batch of questions for a given form
     * 
     * @param userId user id of the user
     * @param createManyQuestionsDto CreateManyQuestionDto
     * @returns a prisma batch which contain count of records inserted
     */
    async createManyQuestions(userId: number, createManyQuestionsDto: CreateManyQuestionsDto): Promise<any> {

        // get the form from the database
        const formExists = await this.prisma.form.count({
            where: {
                id: createManyQuestionsDto.formId,
                userId: userId
            }
        })
       
        // updating form id
        for(let i=0;i<createManyQuestionsDto.questions.length;i++){
            createManyQuestionsDto.questions[i].formId = createManyQuestionsDto.formId
        }

        // check if the form exists
        if (formExists > 0) {
            const questions = await this.prisma.question.createMany({
                data: createManyQuestionsDto.questions,
                skipDuplicates: true
            })

            return questions
        }else{
            throw new NotFoundException('Given form is not existed')
        }

    }

    /**
     * Delete a question
     * 
     * @param userId user id of the user
     * @param questionId quetsion id of the question to be deleted
     * @returns returns true if delted successfully
     */
    async deleteQuestion(userId: number, questionId: number): Promise<Boolean> {
        const question = await this.prisma.question.findUnique({
            where: {
                id: questionId
            },
        })

        // if there is no question exists with this question id
        if (question === null) { // then throw not found exception
            throw new NotFoundException('Not Found')
        }

        // query the form to which the question part of
        const parentForm = await this.prisma.form.findUnique({
            where: {
                id: question.formId
            }
        })

        // if the ownership of the form is same as the given user
        if (parentForm.userId === userId) { // delete the question
            await this.prisma.question.delete({
                where: {
                    id: questionId
                }
            })

            return true
        } else { // otherwise raise BadRequestException
            throw new BadRequestException('No question is associated with question id')
        }

    }

}
