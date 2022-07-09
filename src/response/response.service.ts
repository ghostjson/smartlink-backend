import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResponseDto } from './dto';

@Injectable()
export class ResponseService {
    constructor(private prisma: PrismaService) {}

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

        return response;
    }
}
