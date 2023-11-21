import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Req } from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StoreEntity } from '../entities/store.entity';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store-dto';
import { CreateBusinessStoreDto } from '../dto/create-business-store.dto';
import { UpdateBusinessStoreDto } from '../dto/update-business-store.dto';
import { Status } from '@prisma/client';

@Controller({
  version: '1',
  path: 'stores',
})
@ApiTags('Stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }

  @Post('individual')
  @ApiCreatedResponse({ type: StoreEntity })
  createIndividual(@Body() createStoreDto: CreateStoreDto,) {
    try{
      return this.storesService.createIndividual(createStoreDto);
    }catch(e){
      console.log(e);
    }
  }

  @Post('business')
  @ApiCreatedResponse({ type: StoreEntity })
  createBusiness(@Body() createBusinessStoreDto: CreateBusinessStoreDto) {
    return this.storesService.createBusiness(createBusinessStoreDto);
  }

  @Get()
  @ApiCreatedResponse({ type: [StoreEntity] })
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: StoreEntity })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Get('vendor/:id')
  @ApiCreatedResponse({ type: [StoreEntity] })
  findByVendor(@Param('id') id: string) {
    return this.storesService.findByVendor(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: StoreEntity })
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Patch('business/:id')
  @ApiCreatedResponse({ type: StoreEntity })
  updateBusiness(@Param('id') id: string, @Body() updateBusinessStoreDto: UpdateBusinessStoreDto) {
    return this.storesService.updateBusiness(id, updateBusinessStoreDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: StoreEntity })
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
