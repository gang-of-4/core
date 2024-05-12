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
    await prisma.item.deleteMany();
    await prisma.order.deleteMany();
    await prisma.optionGroup.deleteMany();
    await prisma.option.deleteMany();
    await prisma.image.deleteMany();
    await prisma.address.deleteMany();
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
    const createOrder = {
      id: orderId,
      items: [
        {
          id: randomUUID(),
          item: {
            name: 'Test Item',
            id: randomUUID(),
            sku: 'test',
            slug: 'test',
            price: 50,
            description: '',
            images: [],
            storeId: randomUUID(),
            order: 0,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          quantity: 2,
          isVariant: false,
        },
      ],
      status: 'INPROGRESS',
      userId: userId,
      subtotal: 100,
      total: 100,
      address: {
        city: 'riyadh',
        country: 'saudi arabia',
        street: 'street name',
        state: 'riyadh',
        postalCode: '42314',
        notes: 'small note',
      },
    };
    await kafkaListener.createOrder(createOrder);

    const order = await service.findOneOrFail(
      orderId,
      'customer',
      userId,
      null,
    );

    expect(order.uuid).toEqual(orderId);
    expect(order.address.country).toEqual(createOrder.address.country);
    expect(order.items[0].name).toEqual(createOrder.items[0].item.name);
  });
});
