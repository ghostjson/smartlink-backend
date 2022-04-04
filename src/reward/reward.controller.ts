import { Body, Controller, Get, Post } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { GetCurrentUserId } from 'src/decorators';
import { CreateRewardDto } from './dto';
import { RewardService } from './reward.service';

@Controller('/api/v1/rewards')
export class RewardController {
    constructor(private rewardService: RewardService) { }

    @Get('/')
    async getAllRewards(@GetCurrentUserId() userId: number): Promise<Reward[]> {
        return this.rewardService.getAllRewards(userId)
    }

    @Post('/')
    async createReward(@GetCurrentUserId() userId: number, @Body() createRewardDto: CreateRewardDto): Promise<Reward> {
        return await this.rewardService.createReward(userId, createRewardDto)
    }
}
