import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';

@Controller({
  version: '1',
  path: 'roles',
})
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOkResponse({ type: [RoleEntity] })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleEntity })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }
}
