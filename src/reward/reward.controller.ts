import {
    BadGatewayException,
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Reward } from '@prisma/client';
import { GetCurrentUserId, Public } from 'src/decorators';
import { SuccessResponse } from 'src/utility/responses';
import { CreateRewardDto } from './dto';
import { RewardService } from './reward.service';

/**
 * RewardController
 *
 * Controller resposible for reward CRUD
 */
@Controller('/api/v1/rewards')
export class RewardController {
    constructor(private rewardService: RewardService) {}

    /**
     * Get all rewards as response
     * @param userId user id of the authorized user
     * @returns Array of Reward objects
     */
    @Get('/')
    async getAllRewards(@GetCurrentUserId() userId: number): Promise<Reward[]> {
        return this.rewardService.getAllRewards(userId);
    }

    /**
     * Create a new reward
     * @param userId user id of the authorized user
     * @param createRewardDto CreateRewardDto
     * @returns newly created Reward object
     */
    @Post('/')
    async createReward(@GetCurrentUserId() userId: number, @Body() createRewardDto: CreateRewardDto): Promise<Reward> {
        // limit the coupons generated to 1000 for safety
        if (createRewardDto.count > 1000) {
            throw new BadRequestException('Current limit of vouchers created for a reward is 1000');
        }

        return await this.rewardService.createReward(userId, createRewardDto);
    }

    /**
     * Redeem the given code
     * @param userId id of the user
     * @param voucherCode voucher code to be redeem
     * @returns
     */
    @Post('/redeem/:voucherCode')
    async redeemReward(@GetCurrentUserId() userId: number, @Param('voucherCode') voucherCode: string) {
        // TODO: currently any logged in user can redeem any code
        if (await this.rewardService.redeemReward(voucherCode)) {
            return SuccessResponse.put();
        } else {
            throw new NotFoundException('This voucher code not existed or not existing anymore');
        }
    }

    /**
     * Get a specfic reward by id
     * @param rewardId id of the reward
     * @returns returns reward
     */
    @Public()
    @Get('/:id')
    async getReward(@Param('id') rewardId: number) {
        const reward = await this.rewardService.getReward(Number(rewardId));

        if (reward) {
            if (reward.count <= 0) {
                throw new BadRequestException('There is no voucher code exists for this reward');
            }

            return reward;
        } else {
            throw new NotFoundException('Reward is not found');
        }
    }
}
