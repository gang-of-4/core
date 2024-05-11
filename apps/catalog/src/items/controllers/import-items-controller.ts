import {
  Controller,
  Post,
  Body,
  ParseFilePipeBuilder,
  HttpStatus,
  Headers,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller({
  path: 'catalog/import/items',
  version: '1',
})
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  importItems(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    console.log(file, headers);
  }
}
