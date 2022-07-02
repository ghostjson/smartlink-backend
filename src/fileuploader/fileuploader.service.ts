import { Injectable } from '@nestjs/common';
// import * as AWS from 'aws-sdk'
import S3 = require('../../node_modules/aws-sdk/clients/s3');

/**
 * FileUploadService
 *
 * Service responsible for uploading files to aws s3
 */
@Injectable()
export class FileuploaderService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET; // s3 bucket name

    // passing aws credentials
    s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    // upload file to s3
    async uploadFile(file: Express.Multer.File, userId: number) {
        const fileName = `${userId}/${Date.now().toString(
            36,
        )}.${file.originalname.split('.').pop()}`;
        return await this.s3Upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            fileName,
            file.mimetype,
        );
    }

    async s3Upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };

        try {
            const s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
