import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RewardService } from 'src/reward/reward.service';
import { CreateResponseDto } from './dto';

@Injectable()
export class ResponseService {
    constructor(private prisma: PrismaService, private rewardService: RewardService) {}

    /**
     * Get response of a specific form
     * @param formId id of the form
     * @returns return array of responses
     */
    async getResponseOfSpecificForm(formId: number) {
        const form = await this.prisma.form.findUnique({
            where: {
                id: formId,
            },
            include: {
                responses: true,
            },
        });

        return form.responses;
    }

    /**
     * create a new response for a given form
     * @param formId id of the form
     * @param createResponseDto create new response dto
     * @returns created form response
     */
    async createResponseForForm(formId: number, createResponseDto: CreateResponseDto) {
        const form = await this.prisma.form.findFirst({
            where: {
                id: formId,
            },
            include: {
                reward: true,
            },
        });

        // create the response object
        const response = await this.prisma.response.create({
            data: {
                formId: formId,
                meta: createResponseDto.meta,
                name: createResponseDto.name,
                number: createResponseDto.number,
                totalScore: createResponseDto.totalScore,
            },
        });

        // adding the response id to the answers
        let answers = [];
        for (const answer of createResponseDto.answers) {
            answer['responseId'] = response.id;
            answer['formId'] = form.id;
            answers.push(answer);
        }

        // create all answers to the answers table
        await this.prisma.answers.createMany({
            data: answers,
        });

        // if the form contain reward add voucher to the form
        if (form.reward) {
            const voucher = await this.rewardService.getUnallocatedReward(form.rewardId);
            this.rewardService.publishRedemption(voucher.id);

            response['voucherCode'] = voucher.code;
        }

        return response;
    }

    /**
     * Returns all answers of a specific response
     * @param responseId id of the response
     * @returns answers of that response
     */
    async getAllAnswersOfResponse(responseId: number) {
        const answers = await this.prisma.response.findFirst({
            where: {
                id: responseId,
            },
            include: {
                answers: true,
            },
        });

        return answers;
    }

    /**
     * Get all ansers of a particular answers
     * @param formId id of the form
     */
    async getAllAnswersOfForm(formId: number) {
        const answers = await this.prisma.answers.findMany({
            where: {
                formId,
            },
        });
        return answers;
    }

    /**
     * Get stats of answers of a particular response
     * @param responseId id of the response
     */
    async getStatsOfResponse(formId: number) {
        // get all answers
        const answers = await this.getAllAnswersOfForm(formId);

        // get response count
        const responseCount = await this.prisma.response.count({
            where: {
                formId,
            },
        });

        // agregate answers
        const stats = {};
        for (const answer of answers) {
            if (!(answer.questionId in stats)) {
                stats[answer.questionId] = {};
            }

            if (answer.answer in stats[answer.questionId]) {
                stats[answer.questionId][answer.answer] += 1;
            } else {
                stats[answer.questionId][answer.answer] = 1;
            }
        }

        // Calculate percentage
        for (const stat of Object.keys(stats)) {
            for (const st of Object.keys(stats[stat])) {
                stats[stat][st] = (stats[stat][st] / responseCount) * 100;
            }
        }

        return stats;
    }
}
