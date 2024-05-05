import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'CATALOG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'catalog',
          protoPath: join(__dirname, '../../src/grpc/catalog.proto'),
          url: 'localhost:50052',
          loader: {
            longs: Number,
            arrays: true,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'cart-consumer',
            allowAutoTopicCreation: true,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
