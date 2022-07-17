import { Module } from '@nestjs/common';
import { FormService } from 'src/form/form.service';
import { RewardService } from 'src/reward/reward.service';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

@Module({
    controllers: [ResponseController],
    providers: [ResponseService, FormService, RewardService],
})
export class ResponseModule {}
