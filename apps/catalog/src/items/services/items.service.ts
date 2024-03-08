import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ItemEntity } from '../entities/item.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client/catalog';
import { SlugExistsException } from '../exceptions/slug-exists.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ListItemsDto } from '../dto/items/list-items.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<ItemEntity> {
    const item = await this.prisma.item
      .create({
        data: {
          name: createItemDto.name,
          quantity: createItemDto.quantity,
          price: createItemDto.price,
          description: createItemDto.description,
          storeId: createItemDto.store_id,
          status: (createItemDto.status as Status) ?? Status.DRAFT,
          order: (await this.count()) + 1,
          slug: createItemDto.name?.toLowerCase().replace(' ', '-'),
          isActive: false,
          categories: {
            connect: [
              ...(createItemDto.categories?.map((category) => ({
                id: category,
              })) ?? []),
            ],
          },
          options: {
            connect: [
              ...(createItemDto.options?.map((option) => ({
                id: option,
              })) ?? []),
            ],
          },
        },
      })
      .catch((e) => {
        switch (e.code) {
          case 'P2002':
            throw new SlugExistsException();
          default:
            throw e;
        }
      });

    return await this.findOne(item.id);
  }

  async count(): Promise<number> {
    return this.prisma.item.count({
      where: {
        deletedAt: null,
      },
    });
  }

  async findAll(listItemsDto: ListItemsDto): Promise<ItemEntity[]> {
    const items = await this.prisma.item.findMany({
      where: {
        storeId: listItemsDto.store_id,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        categories: true,
      },
    });
    return items.map((item) => new ItemEntity(item));
  }

  async findOneOrFail(id: string): Promise<ItemEntity> {
    const { options, ...item } = await this.prisma.item
      .findUniqueOrThrow({
        where: { id, deletedAt: null },
        include: {
          categories: true,
          options: {
            include: {
              group: true,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return new ItemEntity({
      ...item,
      groups: Object.values(
        options.reduce((acc, option) => {
          if (option.group) {
            if (!acc[option.group.id]) {
              acc[option.group.id] = option.group;
            }
            const { group, ...data } = option;
            acc[group.id].options = [...(acc[group.id].options || []), data];
          }
          return acc;
        }, {}),
      ),
    });
  }

  async findOne(id: string): Promise<ItemEntity> {
    const { options, ...item } = await this.prisma.item.findUnique({
      where: { id, deletedAt: null },
      include: {
        categories: true,
        options: {
          include: {
            group: true,
          },
        },
      },
    });

    return new ItemEntity({
      ...item,
      groups: Object.values(
        options.reduce((acc, option) => {
          if (option.group) {
            if (!acc[option.group.id]) {
              acc[option.group.id] = option.group;
            }
            const { group, ...data } = option;
            acc[group.id].options = [...(acc[group.id].options || []), data];
          }
          return acc;
        }, {}),
      ),
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string): Promise<ItemEntity> {
    return new ItemEntity(
      await this.prisma.item.delete({
        where: {
          id,
        },
      }),
    );
  }
}
