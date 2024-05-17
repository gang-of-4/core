import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '../services/items.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ItemsController } from '../controllers/items.controller';
import { randomUUID } from 'crypto';
import { JwtModule } from '@nestjs/jwt';
import { ItemEntity } from '../entities/item.entity';
import { ListItemsDto } from '../dto/items/list-items.dto';
import { CreateItemDto } from '../dto/items/create-item.dto';

describe('ItemsService', () => {
  let service: ItemsService;
  let prisma: PrismaService;
  let defaultItem;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
              loader: {
                longs: Number,
                arrays: true,
              },
            },
          },
        ]),
      ],
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();

    defaultItem = {
      name: 'example',
      sku: 'example',
      slug: 'example',
      quantity: 1,
      price: 100,
      description: 'example',
      store_id: randomUUID(),
      status: 'PENDING',
    };
  });

  afterEach(async () => {
    await prisma.item.deleteMany({
      where: {
        name: defaultItem.name || 'updated',
        sku: defaultItem.sku,
      },
    });
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create an item', async () => {
    const item = await service.create(new CreateItemDto(defaultItem));

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual(defaultItem.name);
    expect(item.sku).toEqual(defaultItem.sku);
  });

  it('should find an item by id', async () => {
    const createdItem = await service.create(new CreateItemDto(defaultItem));
    const item = await service.findOne(createdItem.id);

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual(defaultItem.name);
    expect(item.sku).toEqual(defaultItem.sku);
  });

  it('should return array of items', async () => {
    await service.create(new CreateItemDto(defaultItem));
    const items = await service.findAll(
      new ListItemsDto({ store_id: defaultItem.store_id }),
      'admin',
    );

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBeGreaterThan(0);
  });

  it('should update an item', async () => {
    const createdItem = await service.create(new CreateItemDto(defaultItem));

    const item = await service.update(createdItem.id, {
      ...defaultItem,
      name: 'updated',
    });

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual('updated');
  });

  it('should update an item status', async () => {
    const createdItem = await service.create(new CreateItemDto(defaultItem));

    const item = await service.updateStatus(createdItem.id, {
      status: 'APPROVED',
    });

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.status).toEqual('APPROVED');
  });

  it('should delete an item', async () => {
    const createdItem = await service.create(new CreateItemDto(defaultItem));
    const item = await service.remove(createdItem.id);
    const cutomerItems = await service.findAll({}, '');

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.deletedAt).toEqual(expect.any(Date));
    expect(cutomerItems).not.toContainEqual(item);
  });
});
