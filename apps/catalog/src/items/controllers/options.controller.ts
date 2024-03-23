import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OptionsService } from '../services/options.service';
import { CreateOptionDto } from '../dto/options/create-option.dto';

@Controller({
  path: 'catalog/options',
  version: '1',
})
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionsService.create(createOptionDto);
  }

  @Get()
  async findAll() {
    return await this.optionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(id);
  }
}
