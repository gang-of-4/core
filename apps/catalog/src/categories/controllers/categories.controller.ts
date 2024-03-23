import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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

  @Post()
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
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
