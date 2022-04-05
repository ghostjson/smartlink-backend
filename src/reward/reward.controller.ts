import { Body, Controller, Get, Post } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { GetCurrentUserId } from 'src/decorators';
import { CreateRewardDto } from './dto';
import { RewardService } from './reward.service';

/**
 * RewardController 
 * 
 * Controller resposible for reward CRUD
 */
@Controller('/api/v1/rewards')
export class RewardController {
    constructor(private rewardService: RewardService) { }

    /**
     * Get all rewards as response
     * @param userId user id of the authorized user
     * @returns Array of Reward objects
     */
    @Get('/')
    async getAllRewards(@GetCurrentUserId() userId: number): Promise<Reward[]> {
        return this.rewardService.getAllRewards(userId)
    }

    /**
     * Create a new reward
     * @param userId user id of the authorized user
     * @param createRewardDto CreateRewardDto
     * @returns newly created Reward object
     */
    @Post('/')
    async createReward(@GetCurrentUserId() userId: number, @Body() createRewardDto: CreateRewardDto): Promise<Reward> {
        return await this.rewardService.createReward(userId, createRewardDto)
    }
}
