import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController, PermissionsController],
  providers: [RolesService, PermissionsService],
  exports: [RolesService, PermissionsService],
})
export class RolesModule {}
