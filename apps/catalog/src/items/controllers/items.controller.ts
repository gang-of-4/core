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
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ListItemsDto } from '../dto/items/list-items.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateVariantsDto } from '../dto/items/create-variants.dto';
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

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

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

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.itemsService.findOneOrFail(id, token?.user?.role?.name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(id, updateItemDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateItemStatusDto: UpdateItemStatusDto,
  ) {
    return await this.itemsService.updateStatus(id, updateItemStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(id);
  }

  @Post(':id/variants')
  async createVariants(
    @Param('id') id: string,
    @Body() createVariantsDto: CreateVariantsDto,
  ) {
    return await this.itemsService.createVariants(id, createVariantsDto);
  }
}
