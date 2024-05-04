import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOptionGroupDto } from '../dto/option-group/create-option-group.dto';
import { OptionGroupEntity } from '../entities/option-group.entity';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class OptionGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionGroupDto) {
    const optionGroup = await this.prisma.optionGroup.create({
      data: {
        title: createOptionDto.title,
        type: createOptionDto.type,
        order: (await this.count()) + 1,
      },
    });
    return new OptionGroupEntity(optionGroup);
  }

  async count(): Promise<number> {
    return this.prisma.optionGroup.count({
      where: {
        deletedAt: null,
      },
    });
  }

  async findAll() {
    const groups = await this.prisma.optionGroup.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        options: true,
      },
    });
    return groups.map((group) => new OptionGroupEntity(group));
  }

  async findOneOrFail(id: string) {
    return new OptionGroupEntity(
      await this.prisma.optionGroup
        .findUniqueOrThrow({
          where: { id, deletedAt: null },
          include: {
            options: true,
          },
        })
        .catch(() => {
          throw new NotFoundException();
        }),
    );
  }

  async findOne(id: string) {
    return new OptionGroupEntity(
      await this.prisma.optionGroup.findUniqueOrThrow({
        where: { id, deletedAt: null },
        include: {
          options: true,
        },
      }),
    );
  }
}
