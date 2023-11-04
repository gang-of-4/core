import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { RoleExistsRule } from './rules/role-exist.rule';
import { IsEmailUniqueRule } from './rules/is-unique';

@Module({
  imports: [PrismaModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService, RoleExistsRule, IsEmailUniqueRule],
  exports: [UsersService],
})
export class UsersModule {}
