import { BadRequestException, Injectable } from '@nestjs/common';
import { Form } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFormDto } from './dto';

/**
 * FormService
 *
 * Service resposible for all business logic related to forms
 */
@Injectable()
export class FormService {
    constructor(private prisma: PrismaService) {}

    /**
     * Returns all forms a given user
     * @param userId id of the user
     * @returns Array of form objects
     */
    async getAllFormsByUserId(userId: number): Promise<Form[]> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                forms: {
                    include: {
                        questions: true,
                    },
                },
            },
        });

        return user.forms;
    }

    /**
     * Create a new for a given user
     * @param userId user id of the user
     * @param createFormDto CreateFormDto
     * @returns return newly created form
     */
    async createFormByUserId(
        userId: number,
        createFormDto: CreateFormDto,
    ): Promise<Form> {
        const form = await this.prisma.form.create({
            data: {
                type: createFormDto.type,
                validity: createFormDto.validity,
                style: createFormDto.style,
                name: createFormDto.name,
                userId: userId,
                metaData: createFormDto.metaData,
            },
        });

        return form;
    }

    /**
     * Get form by id
     *
     * @param formId id of the form
     * @returns returns the form
     */
    async getFormById(formId: number): Promise<Form> {
        const form = await this.prisma.form.findUnique({
            where: {
                id: formId,
            },
            include: {
                questions: true,
            },
        });

        return form;
    }

    /**
     * Delete a form of a user using userid
     * @param userId id of the user
     * @param formId form id of the form to be deleted
     * @returns returns true if deleted succesfully
     */
    async deleteFormByUserId(userId: number, formId: number): Promise<Boolean> {
        await this.prisma.form.deleteMany({
            where: {
                id: formId,
                userId: userId,
            },
        });

        return true;
    }

    /**
     * Associate a form with an existing reward
     * @param userId id of the user
     * @param formId id of the form
     * @param rewardId id of the reward
     * @returns returns a form object
     */
    async associateReward(
        userId: number,
        formId: number,
        rewardId: number,
    ): Promise<Form> {
        const formExists = await this.prisma.form.count({
            // returns no of form records
            where: {
                userId,
                id: formId,
            },
        });

        const rewardExists = await this.prisma.reward.count({
            // returns no of reward records
            where: {
                userId,
                id: rewardId,
            },
        });

        if (formExists === 0 || rewardExists === 0) {
            // returns false if there is no record exists for this user
            throw new BadRequestException(
                'Given Form or Reward for the given user does not exists',
            );
        }

        const form = await this.prisma.form.update({
            where: {
                id: formId,
            },
            data: { rewardId },
        });

        return form;
    }
}
