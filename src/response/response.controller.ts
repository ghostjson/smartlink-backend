import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/decorators';
import { FormService } from 'src/form/form.service';
import { CreateResponseDto } from './dto';
import { ResponseService } from './response.service';

@Controller('/api/v1/responses')
export class ResponseController {
    constructor(private formService: FormService, private responseService: ResponseService) {}

    /**
     * Get all responses of a specific form
     */
    @Get('/:formId')
    @HttpCode(HttpStatus.OK)
    async getAllResponseOfAForm(@GetCurrentUserId() userId: number, @Param('formId') formId: number) {
        if (await this.formService.isFormBelongsToUser(Number(userId), Number(formId))) {
            return this.responseService.getResponseOfSpecificForm(Number(formId));
        } else {
            throw new NotFoundException();
        }
    }

    /**
     * Submit a form response
     * @param formId id of the form
     * @param createResponseDto createResponse DTO
     * @returns form response
     */
    @Public()
    @Post('/:formId')
    @HttpCode(HttpStatus.CREATED)
    async createResponseForAForm(@Param('formId') formId: number, @Body() createResponseDto: CreateResponseDto) {
        formId = Number(formId);

        if (await this.formService.isFormExists(formId)) {
            return this.responseService.createResponseForForm(formId, createResponseDto);
        } else {
            throw new NotFoundException('Form not exists');
        }
    }
}
