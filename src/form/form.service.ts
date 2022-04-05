import { Injectable } from '@nestjs/common';
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

    constructor(private prisma: PrismaService) { }

    /**
     * Returns all forms a given user
     * @param userId id of the user
     * @returns Array of form objects
     */
    async getAllFormsByUserId(userId: number): Promise<Form[]> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                forms: {
                    include: {
                        questions: true
                    }
                }
            }
        })

        return user.forms
    }

    /**
     * Create a new for a given user
     * @param userId user id of the user
     * @param createFormDto CreateFormDto
     * @returns return newly created form
     */
    async createFormByUserId(userId: number, createFormDto: CreateFormDto): Promise<Form> {
        const form = await this.prisma.form.create({
            data: {
                type: createFormDto.type,
                validity: createFormDto.validity,
                userId: userId
            }
        })

        return form
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
                userId: userId
            }
        })

        return true
    }

}
