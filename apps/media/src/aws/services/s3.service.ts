import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async upload(file: Express.Multer.File, name: string, ownerId: string) {
    const response = await this.s3
      .upload({
        Bucket: 'media.cars4sale.tech',
        Key: `${ownerId}/${name}`,
        Body: file.buffer,
      })
      .promise();
    return response.Location;
  }
}
