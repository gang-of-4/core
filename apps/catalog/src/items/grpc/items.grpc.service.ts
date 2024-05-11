import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { ItemsService } from '../services/items.service';
import { instanceToPlain } from 'class-transformer';
import { GetItemDto } from '../dto/items/get-item.dto';
import { GetManyItemsDto } from '../dto/items/get-many-items.dto';

@GrpcService()
export class ItemsGrpcService {
  constructor(private readonly itemsService: ItemsService) {}

  @GrpcMethod('ItemsService')
  async GetItem(getItemDto: GetItemDto) {
    const result = await this.itemsService.findOneOrFail(getItemDto.id);
    return instanceToPlain(result, { groups: ['grpc'] });
  }

  @GrpcMethod('ItemsService')
  async GetManyItems(getManyItemsDto: GetManyItemsDto) {
    const result = await this.itemsService.findManyById(getManyItemsDto.ids);
    return {
      payload: result.map((item) =>
        instanceToPlain(item, { groups: ['grpc'] }),
      ),
    };
  }
}
