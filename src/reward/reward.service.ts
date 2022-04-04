import { Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRewardDto } from './dto';

@Injectable()
export class RewardService {

    constructor(private prisma: PrismaService) { }

    async getAllRewards(userId: number): Promise<Reward[]> {
        const rewards = await this.prisma.reward.findMany({
            where: { userId }
        })
        return rewards
    }

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
