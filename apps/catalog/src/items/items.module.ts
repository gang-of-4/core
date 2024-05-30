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
import { ItemsGrpcService } from './grpc/items.grpc.service';
import { VariantsGrpcService } from './grpc/variants.grpc.service';
import { VariantsService } from './services/variants.service';
import { CatalogGrpcService } from './grpc/catalog.grpc.service';

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
          protoPath: join(__dirname, '../grpc/media.proto'),
          url: 'media:50051',
          loader: {
            longs: Number,
            arrays: true,
          },
        },
      },
    ]),
  ],
  controllers: [
    ItemsController,
    OptionsController,
    OptionGroupsController,
    VariantsGrpcService,
    ItemsGrpcService,
    CatalogGrpcService,
  ],
  providers: [
    ItemsService,
    VariantsService,
    OptionsService,
    OptionGroupsService,
    GroupExistsRule,
  ],
})
export class ItemsModule {}
