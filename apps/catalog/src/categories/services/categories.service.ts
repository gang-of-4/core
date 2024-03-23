import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '../../items/exceptions/not-found.exception';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { SlugUsedException } from '../../items/exceptions/slug-used.exception';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return new CategoryEntity(
      await this.prisma.cateogry
        .create({
          data: {
            name: createCategoryDto.name,
            slug: createCategoryDto.slug,
            isActive: false,
            description: createCategoryDto.description,
            banner: createCategoryDto.banner,
            parentId: createCategoryDto.parent_id,
            order: (await this.count()) + 1,
          },
          include: {
            parent: true,
          },
        })
        .catch((e) => {
          if (e.code === 'P2002') {
            throw new SlugUsedException();
          }
          throw e;
        }),
    );
  }

  async count() {
    return this.prisma.cateogry.count({
      where: {
        deletedAt: null,
      },
    });
  }

  async update(id: string, updateCategory: UpdateCategoryDto) {
    return new CategoryEntity(
      await this.prisma.cateogry.update({
        where: { id },
        data: updateCategory,
        include: {
          parent: true,
        },
      }),
    );
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.cateogry.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        parent: true,
      },
    });
    return categories.map((category) => new CategoryEntity(category));
  }

  async findOneOrFail(id: string) {
    return new CategoryEntity(
      await this.prisma.cateogry
        .findUniqueOrThrow({
          where: { id, deletedAt: null },
          include: {
            parent: true,
          },
        })
        .catch(() => {
          throw new NotFoundException();
        }),
    );
  }

  async findOne(id: string) {
    return new CategoryEntity(
      await this.prisma.cateogry.findUnique({
        where: { id, deletedAt: null },
        include: {
          parent: true,
        },
      }),
    );
  }

  async remove(id: string) {
    return new CategoryEntity(
      await this.prisma.cateogry.delete({
        where: { id },
      }),
    );
  }
}
