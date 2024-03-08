import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/categories/create-category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller({
  path: 'catalog/categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneOrFail(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(id);
  }
}
