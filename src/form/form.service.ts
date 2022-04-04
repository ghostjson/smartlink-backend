import { Injectable } from '@nestjs/common';
import { Form } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFormDto } from './dto';

@Injectable()
export class FormService {

    constructor(private prisma: PrismaService) { }

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
