import {
  UploadedFile,
  Controller,
  UseInterceptors,
  Post,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { S3Service } from '../../aws/services/s3.service';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileMimeTypeValidator } from '../validators/file-mimetype.validator';

@Controller({
  version: '1',
  path: 'media/upload',
})
export class UploadController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  imageUpload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new FileMimeTypeValidator({
            mimeTypes: ['image/jpeg', 'image/png'],
          }),
        )
        .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    return this.mediaService.create(
      file,
      headers?.authorization?.replace('Bearer ', ''),
    );
  }
}
