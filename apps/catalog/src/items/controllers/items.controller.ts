import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  SerializeOptions,
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ListItemsDto } from '../dto/items/list-items.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateVariantsDto } from '../dto/variants/create-variants.dto';
import { UpdateItemStatusDto } from '../dto/items/update-item-status.dto';

@Controller({
  path: 'catalog/items',
  version: '1',
})
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private jwtService: JwtService,
  ) {}

  @SerializeOptions({
    groups: ['http'],
  })
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Get()
  async findAll(
    @Query() listItemsDto: ListItemsDto,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.itemsService.findAll(
      listItemsDto,
      token?.user?.role?.name,
    );
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.itemsService.findOneOrFail(id, token?.user?.role?.name);
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(id, updateItemDto);
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateItemStatusDto: UpdateItemStatusDto,
  ) {
    return await this.itemsService.updateStatus(id, updateItemStatusDto);
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(id);
  }

  @SerializeOptions({
    groups: ['http'],
  })
  @Post(':id/variants')
  async createVariants(
    @Param('id') id: string,
    @Body() createVariantsDto: CreateVariantsDto,
  ) {
    return await this.itemsService.createVariants(id, createVariantsDto);
  }
}
