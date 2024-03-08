import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ListItemsDto } from '../dto/items/list-items.dto';

@Controller({
  path: 'catalog/items',
  version: '1',
})
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll(@Query() listItemsDto: ListItemsDto) {
    return await this.itemsService.findAll(listItemsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemsService.findOneOrFail(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(id);
  }
}
