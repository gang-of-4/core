import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.create({
        data: {
          first_name: createUserDto.first_name,
          last_name: createUserDto.last_name,
          email: createUserDto.email,
          phone: createUserDto.phone,
          role: {
            connect: {
              id: createUserDto.role_id,
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

  async findOne(id: string) {
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          first_name: updateUserDto.first_name,
          last_name: updateUserDto.last_name,
          email: updateUserDto.email,
          phone: updateUserDto.phone,
          role: {
            connect: {
              id: updateUserDto.role_id,
            },
          },
        },
      }),
    );
  }

  async remove(id: string): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.delete({
        where: {
          id,
        },
      }),
    );
  }
}
