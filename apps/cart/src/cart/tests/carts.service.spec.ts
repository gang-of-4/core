import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../services/cart.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CartEntity } from '../entities/cart.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ClientsModule.register([
        {
          name: 'CATALOG_PACKAGE',
          transport: Transport.GRPC,
          options: {
            package: 'catalog',
            protoPath: join(__dirname, '../../grpc/catalog.proto'),
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
      controllers: [],
      providers: [CartService],
      exports: [],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();
  });

  afterEach(async () => {
    await prisma.cart.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create a cart', async () => {
    const userId = randomUUID();
    const cart = await service.getExistingOrCreate(
      userId,
    );

    expect(cart).toBeInstanceOf(CartEntity);
    expect(cart.userId).toEqual(userId);
  });

  it('should find a cart by userId', async () => {
    const userId = randomUUID();
    
    const createdCart = await service.getExistingOrCreate(
      userId,
    );
    expect(createdCart).toBeInstanceOf(CartEntity);
    expect(createdCart.userId).toEqual(userId);

    const foundedCart = await service.getExistingOrCreate(
      userId,
    );
    expect(foundedCart).toBeInstanceOf(CartEntity);
    expect(foundedCart.id).toEqual(createdCart.id);
  });
});
