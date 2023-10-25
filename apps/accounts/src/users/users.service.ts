import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(await this.prisma.role.create({ data: { name: 'admin' } }));
    return await this.prisma.user.create({
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
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(await this.prisma.role.findMany());
    return await this.prisma.user.update({
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
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
