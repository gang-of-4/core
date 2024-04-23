import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { UploadController } from './controllers/upload.controller';
import { AwsModule } from 'src/aws/aws.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaGrpcService } from './grpc/media.grpc.service';

@Module({
  imports: [AwsModule, PrismaModule],
  controllers: [UploadController, MediaGrpcService],
  providers: [MediaService],
})
export class MediaModule {}
