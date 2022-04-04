import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/decorators';
import { SuccessResponse } from 'src/utility/responses';
import { CreateFormDto } from './dto';
import { FormService } from './form.service';

@Controller('api/v1/forms')
export class FormController {

    constructor(private formService: FormService) { }


    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllForms(@GetCurrentUserId() userId: number) {
        return this.formService.getAllFormsByUserId(userId)
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createForm(@GetCurrentUserId() userId: number, @Body() createFormDto: CreateFormDto) {
        return this.formService.createFormByUserId(userId, createFormDto)
    }

    @Delete('/:formId')
    @HttpCode(HttpStatus.OK)
    async deleteForm(@GetCurrentUserId() userId: number, @Param('formId') formId: number): Promise<SuccessResponse> {
        await this.formService.deleteFormByUserId(userId, Number(formId))
        return SuccessResponse.put()
    }

}
