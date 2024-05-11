import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesController } from '../categories/controllers/categories.controller';
import { CategoriesService } from '../categories/services/categories.service';
import { CategoryExistsRule } from '../categories/rules/category-exist.rule';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryExistsRule],
})
export class CategoriesModule {}
