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

        const response = await this.prisma.response.create({
            data: {
                formId: formId,
                answers: createResponseDto.answers,
                meta: createResponseDto.meta,
                name: createResponseDto.name,
                number: createResponseDto.number,
                totalScore: createResponseDto.totalScore,
            },
        });

        if (form.reward) {
            const voucher = await this.rewardService.getUnallocatedReward(form.rewardId);
            this.rewardService.publishRedemption(voucher.id);

            response['voucherCode'] = voucher.code;
        }

        return response;
    }
}
