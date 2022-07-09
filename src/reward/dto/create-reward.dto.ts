import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';

/**
 * CreateRewardDto
 */
export class CreateRewardDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsObject()
    content: object;

    @IsNotEmpty()
    validity: Date;

    @IsObject()
    style: object;
}
