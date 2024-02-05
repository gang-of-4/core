import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEntity } from '../entities/role.entity';
import { Role } from '@prisma/client/accounts';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((role) => new RoleEntity(role));
  }

  async findOne(id: Role['id']): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role
        .findUniqueOrThrow({
          where: {
            id: id,
          },
        })
        .catch(() => {
          throw new NotFoundException();
        }),
    );
  }

  async findOneByName(name: Role['name']): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role
        .findUniqueOrThrow({
          where: {
            name: name,
          },
        })
        .catch(() => {
          throw new NotFoundException();
        }),
    );
  }
}
