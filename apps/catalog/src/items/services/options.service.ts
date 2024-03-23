import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OptionEntity } from '../entities/option.entity';
import { CreateOptionDto } from '../dto/options/create-option.dto';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    return new OptionEntity(
      await this.prisma.option.create({
        data: {
          label: createOptionDto.label,
          value: createOptionDto.value,
          group_id: createOptionDto.group_id,
        },
      }),
    );
  }

  async findAll() {
    const options = await this.prisma.option.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        group: true,
      },
    });
    return options.map((user) => new OptionEntity(user));
  }

  async findOne(id: string) {
    return new OptionEntity(
      await this.prisma.option
        .findUniqueOrThrow({
          where: { id },
          include: {
            group: true,
          },
        })
        .catch(() => {
          throw new NotFoundException();
        }),
    );
  }
}
