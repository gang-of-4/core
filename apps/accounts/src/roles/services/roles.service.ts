import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEntity } from '../entities/role.entity';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((role) => new RoleEntity(role));
  }

  async findOne(id: Role['id']): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }

  async findOneByName(name: Role['name']): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
        where: {
          name: name,
        },
      }),
    );
  }
}
