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
      },
    });
    return new OptionGroupEntity(optionGroup);
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
      }),
    );
  }
}
