import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ItemEntity } from '../entities/item.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client/catalog';
import { SlugUsedException } from '../exceptions/slug-used.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ListItemsDto } from '../dto/items/list-items.dto';
import { CreateVariantsDto } from '../dto/items/create-variants.dto';
import { VariantEntity } from '../entities/variant.entity';
import { VariantsException } from '../exceptions/variants.exception';
import { UpdateItemStatusDto } from '../dto/items/update-item-status.dto';

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
            throw new SlugUsedException();
          default:
            throw e;
        }
      });

    await Promise.all(
      createItemDto.images?.map(async (image) => {
        await this.prisma.itemImages.create({
          data: {
            itemId: item.id,
            mediaId: image,
          },
        });
      }) ?? [],
    );

    return await this.findOne(item.id);
  }

  async count(): Promise<number> {
    return this.prisma.item.count({
      where: {
        deletedAt: null,
      },
    });
  }

  async findAll(
    listItemsDto: ListItemsDto,
    role: string = 'guest',
  ): Promise<ItemEntity[]> {
    const items = await this.prisma.item.findMany({
      where: {
        storeId: listItemsDto.store_id,
        deletedAt: null,
        ...(['guest', 'customer'].includes(role) && {
          status: Status.APPROVED,
        }),
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        categories: true,
        images: true,
      },
    });
    return items.map((item) => new ItemEntity(item));
  }

  async findOneOrFail(id: string, role: string = 'guest'): Promise<ItemEntity> {
    const { options, ...item } = await this.prisma.item
      .findUniqueOrThrow({
        where: {
          id,
          deletedAt: null,
          ...(role === 'guest' && { status: Status.APPROVED }),
        },
        include: {
          categories: true,
          options: {
            include: {
              group: true,
            },
          },
          variants: {
            include: {
              options: true,
            },
          },
          images: true,
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
        variants: {
          include: {
            options: true,
          },
        },
        images: true,
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
    await this.prisma.$transaction(async (tx) => {
      await tx.item
        .update({
          where: {
            id,
          },
          data: {
            name: updateItemDto.name,
            sku: updateItemDto.sku,
            quantity: updateItemDto.quantity,
            price: updateItemDto.price,
            description: updateItemDto.description,
            status: Status.PENDING,
            slug: updateItemDto.name?.toLowerCase().replace(' ', '-'),
            isActive: false,
            categories: {
              connect: [
                ...(updateItemDto.categories?.map((category) => ({
                  id: category,
                })) ?? []),
              ],
            },
            options: {
              connect: [
                ...(updateItemDto.options?.map((option) => ({
                  id: option,
                })) ?? []),
              ],
            },
          },
        })
        .catch((e) => {
          switch (e.code) {
            case 'P2002':
              throw new SlugUsedException();
            default:
              throw e;
          }
        });
      await Promise.all(
        updateItemDto.variants.map(async (variant) => {
          await tx.variant.update({
            where: {
              id: variant.id,
            },
            data: {
              sku: variant.sku,
              price: variant.price,
              quantity: variant.quantity,
            },
          });
        }),
      );
      await Promise.all(
        updateItemDto.images?.map(async (image) => {
          await tx.itemImages.create({
            data: {
              itemId: id,
              mediaId: image,
            },
          });
        }) ?? [],
      );
    });

    return await this.findOne(id);
  }

  async updateStatus(id: string, updateItemStatusDto: UpdateItemStatusDto) {
    return new ItemEntity(
      await this.prisma.item.update({
        where: {
          id,
        },
        data: {
          status: updateItemStatusDto.status,
        },
      }),
    );
  }

  async remove(id: string): Promise<ItemEntity> {
    return new ItemEntity(
      await this.prisma.item.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    );
  }

  async createVariants(itemId: string, createVariantsDto: CreateVariantsDto) {
    const combinations = this.generateCombinations(createVariantsDto.options);

    return await Promise.all(
      combinations.map(async (combination) => {
        const { options, ...variant } = await this.prisma.variant.create({
          data: {
            parentId: itemId,
            options: {
              connect: [
                ...(combination?.map((option) => ({
                  id: option,
                })) ?? []),
              ],
            },
          },
          include: {
            options: {
              include: {
                group: true,
              },
            },
          },
        });
        return new VariantEntity({
          ...variant,
          groups: Object.values(
            options.reduce((acc, option) => {
              if (option.group) {
                if (!acc[option.group.id]) {
                  acc[option.group.id] = option.group;
                }
                const { group, ...data } = option;
                acc[group.id].options = [
                  ...(acc[group.id].options || []),
                  data,
                ];
              }
              return acc;
            }, {}),
          ),
        });
      }),
    ).catch(() => {
      throw new VariantsException();
    });
  }

  private generateCombinations(options) {
    const result = [];
    const stack = [];

    // Initialize stack with first group of options
    // e.g. [[1], [2], [3]]
    options[0].forEach((item) => stack.push([item]));

    while (stack.length > 0) {
      // Pop the last set from the stack
      const currentSet = stack.pop();
      const currentIndex = currentSet.length;

      // If the set is complete, add it to the result
      if (currentIndex === options.length) {
        result.push(currentSet);
      } else {
        // Otherwise, add the next group of options to the stack
        // by creating a new set for each option in the group using current set
        // e.g. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
        options[currentIndex].forEach((item) => {
          stack.push([...currentSet, item]);
        });
      }
    }

    return result;
  }
}
