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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'MEDIA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'media',
          protoPath: join(__dirname, '../../grpc/media.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [ItemsController, OptionsController, OptionGroupsController],
  providers: [
    ItemsService,
    OptionsService,
    OptionGroupsService,
    GroupExistsRule,
  ],
})
export class ItemsModule {}

