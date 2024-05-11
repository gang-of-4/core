import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OptionGroupsService } from '../services/option-groups.service';
import { CreateOptionGroupDto } from '../dto/option-group/create-option-group.dto';

@Controller({
  path: 'catalog/option-groups',
  version: '1',
})
export class OptionGroupsController {
  constructor(private readonly optionGroupsService: OptionGroupsService) {}

  @Post()
  async create(@Body() createOptionGroupDto: CreateOptionGroupDto) {
    return await this.optionGroupsService.create(createOptionGroupDto);
  }

  @Get()
  async findAll() {
    return await this.optionGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionGroupsService.findOne(id);
  }
}
