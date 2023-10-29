import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

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

  async findOneByName(name: string): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
        where: {
          name: name,
        },
      }),
    );
  }
}
