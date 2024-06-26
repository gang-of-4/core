import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { UploadController } from './controllers/upload.controller';
import { AwsModule } from 'src/aws/aws.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaGrpcService } from './grpc/media.grpc.service';
import { MediaController } from './controllers/media.controller';

@Module({
  imports: [AwsModule, PrismaModule],
  controllers: [UploadController, MediaController, MediaGrpcService],
  providers: [MediaService],
})
export class MediaModule {}
