import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionsService } from '../services/permissions.service';

@Controller({
  version: '1',
  path: 'permissions',
})
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOkResponse({ type: [PermissionEntity] })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PermissionEntity })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }
}
