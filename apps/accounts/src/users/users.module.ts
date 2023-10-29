import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesModule } from 'src/roles/roles.module';
import { RoleExistsRule } from './rules/role-exist.rule';

@Module({
  imports: [PrismaModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService, RoleExistsRule],
  exports: [UsersService],
})
export class UsersModule {}
