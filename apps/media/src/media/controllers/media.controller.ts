import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { MediaEntity } from '../entities/media.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'media',
})
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  @ApiOkResponse({ type: MediaEntity })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }
}
