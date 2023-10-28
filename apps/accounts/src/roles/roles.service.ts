import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // create(createRoleDto: CreateRoleDto) {
  //   return 'This action adds a new role';
  // }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((role) => new RoleEntity(role));
  }

  async findOne(id: string): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
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
