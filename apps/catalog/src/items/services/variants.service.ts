import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ItemEntity } from '../entities/item.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client/catalog';
import { SlugUsedException } from '../exceptions/slug-used.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ListItemsDto } from '../dto/items/list-items.dto';
import { CreateVariantsDto } from '../dto/variants/create-variants.dto';
import { VariantEntity } from '../entities/variant.entity';
import { VariantsException } from '../exceptions/variants.exception';
import { UpdateItemStatusDto } from '../dto/items/update-item-status.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { MediaService } from 'src/common/interfaces/media.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class VariantsService {
  private mediaService: MediaService;

  constructor(
    private prisma: PrismaService,
    @Inject('MEDIA_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.mediaService = this.client.getService<MediaService>('MediaService');
  }

  async findOneOrFail(
    id: string,
    role: string = 'guest',
  ): Promise<VariantEntity> {
    const { options, parent, ...variant } = await this.prisma.variant
      .findUniqueOrThrow({
        where: {
          id,
          deletedAt: null,
          parent: {
            ...(role === 'guest' && { status: Status.APPROVED }),
            deletedAt: null,
          },
        },
        include: {
          options: {
            include: {
              group: true,
            },
          },
          parent: {
            include: {
              options: {
                include: {
                  group: true,
                },
              },
              images: {
                select: {
                  mediaId: true,
                },
              },
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    const media = await lastValueFrom(
      this.mediaService.GetManyMedia({
        ids: parent.images.map((entry) => entry.mediaId),
      }),
    );

    return new VariantEntity({
      ...variant,
      parent: {
        ...parent,
        images: media.payload,
        groups: Object.values(
          parent.options.reduce((acc, option) => {
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
      },
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

  async findManyById(
    ids: string[],
    role: string = 'guest',
  ): Promise<VariantEntity[]> {
    const variants = await this.prisma.variant.findMany({
      where: {
        id: {
          in: ids,
        },
        deletedAt: null,
        parent: {
          ...(role === 'guest' && { status: Status.APPROVED }),
          deletedAt: null,
        },
      },
      orderBy: {
        parent: {
          order: 'asc',
        },
      },
      include: {
        options: {
          include: {
            group: true,
          },
        },
        parent: {
          include: {
            options: {
              include: {
                group: true,
              },
            },
            images: {
              select: {
                mediaId: true,
              },
            },
          },
        },
      },
    });

    return Promise.all(
      variants.map(async (variant) => {
        const media = await lastValueFrom(
          this.mediaService.GetManyMedia({
            ids: variant.parent?.images.map((entry) => entry.mediaId),
          }),
        );
        return new VariantEntity({
          ...variant,
          parent: {
            ...variant.parent,
            images: media.payload,
            groups: Object.values(
              variant.parent.options.reduce((acc, option) => {
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
          },
          groups: Object.values(
            variant.options.reduce((acc, option) => {
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
    );
  }
}
