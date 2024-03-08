import { Module } from '@nestjs/common';
import { ItemsService } from '../items/services/items.service';
import { ItemsController } from '../items/controllers/items.controller';
import { OptionsService } from './services/options.service';
import { OptionsController } from './controllers/options.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OptionGroupsController } from './controllers/option-groups.controller';
import { OptionGroupsService } from './services/option-groups.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoryExistsRule } from './rules/category-exist.rule';
import { GroupExistsRule } from './rules/group-exist.rule';

@Module({
  imports: [PrismaModule],
  controllers: [
    ItemsController,
    OptionsController,
    OptionGroupsController,
    CategoriesController,
  ],
  providers: [
    ItemsService,
    OptionsService,
    OptionGroupsService,
    CategoriesService,
    CategoryExistsRule,
    GroupExistsRule,
  ],
})
export class ItemsModule {}
