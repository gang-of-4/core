import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetMediaDto } from '../dto/get-media.dto';
import { MediaService } from '../services/media.service';
import { instanceToPlain } from 'class-transformer';
import { GetManyMediaDto } from '../dto/get-many-media.dto';

@Controller()
export class MediaGrpcService {
  constructor(private readonly mediaService: MediaService) {}

  @GrpcMethod('MediaService')
  async GetMedia(getMediaDto: GetMediaDto) {
    const result = await this.mediaService.findOneOrFail(getMediaDto);
    return instanceToPlain(result);
  }

  @GrpcMethod('MediaService')
  async GetManyMedia(getManyMediaDto: GetManyMediaDto) {
    const result = await this.mediaService.findManyById(getManyMediaDto);
    return {
      payload: result.map((media) => instanceToPlain(media)),
    };
  }
}
