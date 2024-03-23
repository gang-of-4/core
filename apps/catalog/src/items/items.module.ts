import { Module } from '@nestjs/common';
import { ItemsService } from '../items/services/items.service';
import { ItemsController } from '../items/controllers/items.controller';
import { OptionsService } from './services/options.service';
import { OptionsController } from './controllers/options.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OptionGroupsController } from './controllers/option-groups.controller';
import { OptionGroupsService } from './services/option-groups.service';
import { GroupExistsRule } from './rules/group-exist.rule';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ItemsController, OptionsController, OptionGroupsController],
  providers: [
    ItemsService,
    OptionsService,
    OptionGroupsService,
    GroupExistsRule,
  ],
})
export class ItemsModule {}
