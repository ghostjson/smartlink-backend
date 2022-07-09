import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { RewardModule } from './reward/reward.module';
import { FileuploaderModule } from './fileuploader/fileuploader.module';
import { ResponseModule } from './response/response.module';

@Module({
    imports: [AuthModule, PrismaModule, FormModule, QuestionModule, RewardModule, FileuploaderModule, ResponseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
