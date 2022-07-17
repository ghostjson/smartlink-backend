import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
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
    constructor(private prisma: PrismaService) {}

    /**
     * Return all rewards of a given user
     * @param userId user id of the user
     * @returns returns array of reward objects
     */
    async getAllRewards(userId: number): Promise<Reward[]> {
        const rewards = await this.prisma.reward.findMany({
            where: { userId },
        });
        return rewards;
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
                count: createRewardDto.count,
                userId,
            },
        });

        // get total redemptions
        const totalRedemptions = await this.prisma.redemption.count();

        // voucher code generation
        for (let i = 0, appender = totalRedemptions; i < createRewardDto.count; i++, appender++) {
            const code = Math.random().toString(36).slice(2, 7);

            await this.prisma.redemption.create({
                data: {
                    code: code + appender.toString(16), // code = random 5 characters + table total columns in hex
                    rewardId: reward.id,
                    isProcessed: false,
                    isPublished: false,
                },
            });
        }

        return reward;
    }

    /**
     * Get a specific reward
     * @param rewardId id of the reward
     */
    async getReward(rewardId: number): Promise<Reward> {
        return await this.prisma.reward.findFirst({
            where: {
                id: rewardId,
            },
        });
    }

    /**
     * Allocate the given voucher to a user
     * @param id of the voucher
     */
    async publishRedemption(id: number) {
        const redemption = await this.prisma.redemption.update({
            where: {
                id: id,
            },
            data: {
                isPublished: true,
            },
        });

        const reward = await this.getReward(redemption.rewardId);

        await this.prisma.reward.update({
            where: {
                id: redemption.rewardId,
            },
            data: {
                count: reward.count - 1,
            },
        });
    }

    /**
     * Return a new unallocated voucher from the pool
     * @param rewardId id of the reward
     * @returns
     */
    async getUnallocatedReward(rewardId: number) {
        const reward = await this.getReward(rewardId);

        if (reward.count <= 0) {
            throw new ForbiddenException('No vouchers available for this reward');
        }

        return await this.prisma.redemption.findFirst({
            where: {
                rewardId: rewardId,
                isPublished: false,
            },
        });
    }

    /**
     * Radeem reward
     * @param voucherCode
     */
    async redeemReward(voucherCode: string) {
        const redeem = await this.prisma.redemption.count({
            where: {
                code: voucherCode,
                isProcessed: false,
                isPublished: true,
            },
        });

        if (redeem <= 0) {
            throw new BadRequestException('The given voucher not existed');
        } else {
            await this.prisma.redemption.update({
                where: {
                    code: voucherCode,
                },
                data: {
                    isProcessed: true,
                },
            });
        }

        return true;
    }
}
