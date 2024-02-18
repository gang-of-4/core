import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  providers: [S3Service],
  exports: [S3Service],
})
export class AwsModule {}
