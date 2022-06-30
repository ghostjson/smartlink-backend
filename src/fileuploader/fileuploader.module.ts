import { Module } from '@nestjs/common';
import { FileuploaderController } from './fileuploader.controller';
import { FileuploaderService } from './fileuploader.service';

@Module({
  controllers: [FileuploaderController],
  providers: [FileuploaderService]
})
export class FileuploaderModule {}
