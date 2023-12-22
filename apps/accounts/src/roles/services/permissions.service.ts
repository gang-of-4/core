import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PermissionEntity } from '../entities/permission.entity';
import { Permission } from '@prisma/client/accounts';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PermissionEntity[]> {
    const permissions = await this.prisma.permission.findMany();
    return permissions.map((permission) => new PermissionEntity(permission));
  }

  async findOne(id: Permission['id']): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }
}
