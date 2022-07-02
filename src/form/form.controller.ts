import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { Form } from '@prisma/client';
import { GetCurrentUserId, Public } from 'src/decorators';
import { SuccessResponse } from 'src/utility/responses';
import { CreateFormDto } from './dto';
import { FormService } from './form.service';

/**
 * FormController
 *
 * Controller responsible for form CRUD
 */
@Controller('api/v1/forms')
export class FormController {
    constructor(private formService: FormService) {}

    /**
     * Return all forms of an authorized user
     * @param userId User id of the authorized user
     * @returns Array of Form objects
     */
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllForms(@GetCurrentUserId() userId: number) {
        return this.formService.getAllFormsByUserId(userId);
    }

    /**
     * Get form using form id
     * This endpoint is publicly accessable
     *
     * @param formId id of the form
     * @returns form structure
     */
    @Public()
    @Get('/:formId')
    @HttpCode(HttpStatus.OK)
    async getFormById(@Param('formId') formId: number) {
        return this.formService.getFormById(Number(formId));
    }

    /**
     * Create a new form for an authorized user
     * @param userId user id of the authorized user
     * @param createFormDto CreateFormDto
     * @returns returns the newly created form
     */
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createForm(
        @GetCurrentUserId() userId: number,
        @Body() createFormDto: CreateFormDto,
    ) {
        return this.formService.createFormByUserId(userId, createFormDto);
    }

    /**
     * Delete an existing form
     * @param userId user id of the user
     * @param formId form id of the form which to be deleted
     * @returns SuccessResponse object
     */
    @Delete('/:formId')
    @HttpCode(HttpStatus.OK)
    async deleteForm(
        @GetCurrentUserId() userId: number,
        @Param('formId') formId: number,
    ): Promise<SuccessResponse> {
        await this.formService.deleteFormByUserId(userId, Number(formId));
        return SuccessResponse.put();
    }

    /**
     * Associate a form with an existing reward
     * @param userId id of the user
     * @param formId id of the form
     * @param rewardId id of the reward
     * @returns returns a form object
     */
    @Patch('/:formId/:rewardId')
    async associateReward(
        @GetCurrentUserId() userId: string,
        @Param('formId') formId: string,
        @Param('rewardId') rewardId: string,
    ): Promise<Form> {
        const form: Form = await this.formService.associateReward(
            Number(userId),
            Number(formId),
            Number(rewardId),
        );
        return form;
    }
}
