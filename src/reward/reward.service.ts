import { Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRewardDto } from './dto';

/**
 * RewardService
 * 
 * Service responsible for handling all business logic related to rewards 
 */
@Injectable()
export class RewardService {

    constructor(private prisma: PrismaService) { }

    /**
     * Return all rewards of a given user
     * @param userId user id of the user
     * @returns returns array of reward objects
     */
    async getAllRewards(userId: number): Promise<Reward[]> {
        const rewards = await this.prisma.reward.findMany({
            where: { userId }
        })
        return rewards
    }

    /**
     * create a new reward 
     * @param userId user id of the user
     * @param createRewardDto CreateRewardDto
     * @returns returns newly created reward object
     */
    async createReward(userId: number, createRewardDto: CreateRewardDto): Promise<Reward> {
        const reward = await this.prisma.reward.create({
            data: {
                name: createRewardDto.name,
                type: createRewardDto.type,
                content: createRewardDto.content,
                validity: createRewardDto.validity,
                style: createRewardDto.style,
                userId
            }
        })

        return reward

    }

}
