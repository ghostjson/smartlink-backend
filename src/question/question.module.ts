import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

/**
 * QuestionModule
 */
@Module({
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule { }
