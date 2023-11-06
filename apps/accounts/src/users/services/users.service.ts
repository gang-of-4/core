import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          phone: createUserDto?.phone,
          role: {
            connect: {
              id: createUserDto.roleId,
            },
          },
        },
      }),
    );
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: User['id']) {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          role: true,
        },
      }),
    );
  }

  async findOneByEmail(email: User['email']): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      }),
    );
  }

  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          email: updateUserDto.email,
          phone: updateUserDto?.phone,
          role: {
            connect: {
              id: updateUserDto.roleId,
            },
          },
        },
      }),
    );
  }

  async remove(id: User['id']): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.delete({
        where: {
          id,
        },
      }),
    );
  }
}
