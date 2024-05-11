import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersKafkaListener } from './kafka/orders.kafka.listener';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'orders-consumer',
            allowAutoTopicCreation: true,
          },
          subscribe: {
            fromBeginning: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController, OrdersKafkaListener],
  providers: [OrdersService],
})
export class OrdersModule {}
