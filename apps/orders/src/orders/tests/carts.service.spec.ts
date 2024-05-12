import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../services/orders.service';
import { OrdersKafkaListener } from '../kafka/orders.kafka.listener';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderEntity } from '../entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

describe('OrdersService', () => {
  let service: OrdersService;
  let kafkaListener: OrdersKafkaListener;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
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
      controllers: [OrdersKafkaListener],
      providers: [OrdersService],
      exports: [],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    kafkaListener = module.get<OrdersKafkaListener>(OrdersKafkaListener);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();
  });

  afterEach(async () => {
    await prisma.order.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create an order', async () => {
    const userId = randomUUID();
    const orderId = randomUUID();
    const order = await kafkaListener.createOrder({
      id: orderId,
      items: [],
      status: 'INPROGRESS',
      userId: userId,
      subtotal: 0,
      total: 0,
      address: {
        id: '1',
        city: '',
        country: '',
        street: '',
        state: '',
        postalCode: '',
        notes: '',
      },
    });
  });
});
