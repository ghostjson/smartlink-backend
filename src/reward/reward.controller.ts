import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { GetCurrentUserId } from 'src/decorators';
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
    @Post('/:voucherCode')
    async redeemReward(@GetCurrentUserId() userId: number, @Param('voucherCode') voucherCode: string) {
        // TODO: currently any logged in user can redeem any code
        if (this.rewardService.redeemReward(voucherCode)) {
            return new SuccessResponse();
        }
    }
}
