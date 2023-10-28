import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  // create(createRoleDto: CreateRoleDto) {
  //   return 'This action adds a new role';
  // }

  async findAll(): Promise<PermissionEntity[]> {
    const permissions = await this.prisma.permission.findMany();
    return permissions.map((permission) => new PermissionEntity(permission));
  }

  async findOne(id: string): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
