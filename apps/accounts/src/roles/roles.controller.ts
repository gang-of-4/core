import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';

@Controller({
  version: '1',
  path: 'roles',
})
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Post()
  // @ApiCreatedResponse({ type: RoleEntity })
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }

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

  // @Patch(':id')
  // @ApiOkResponse({ type: RoleEntity })
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: RoleEntity })
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }
}
