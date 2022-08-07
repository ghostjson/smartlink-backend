import {
    BadRequestException,
    Controller,
    Post,
    UnsupportedMediaTypeException,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from 'src/decorators';
import { FileuploaderService } from './fileuploader.service';

/**
 * FileUploadController
 *
 * controller responsible for uploading files to aws s3
 */
@Controller('/api/v1/upload')
export class FileuploaderController {
    constructor(private fileUploaderService: FileuploaderService) {}

    /**
     * Upload file to the s3 storage
     *
     * @param userId id of the user
     * @param file file to be uploaded
     * @returns returns location of the file
     */
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@GetCurrentUserId() userId: number, @UploadedFile() file: Express.Multer.File) {
        // check if the file is image or not
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            if (file.size > 2000 * 1000) {
                throw new BadRequestException('file size should be less than 2mb');
            }

            const s3File = await this.fileUploaderService.uploadFile(file, userId);
            return {
                location: s3File.Location,
            };
        } else {
            throw new UnsupportedMediaTypeException('file should be an image');
        }
    }
}
