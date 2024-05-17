import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from '../controllers/items.controller';
import { ItemsService } from '../services/items.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../../prisma/prisma.module';
import { join } from 'path';
import { ItemEntity } from '../entities/item.entity';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { ListItemsDto } from '../dto/items/list-items.dto';

describe('ItemsController', () => {
  let controller: ItemsController;
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

    controller = module.get<ItemsController>(ItemsController);
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
    expect(controller).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create an item', async () => {
    const item = await controller.create(new CreateItemDto(defaultItem));

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual(defaultItem.name);
    expect(item.sku).toEqual(defaultItem.sku);
  });

  it('should find an item by id', async () => {
    const createdItem = await controller.create(new CreateItemDto(defaultItem));
    const item = await controller.findOne(
      createdItem.id,
      'Bearer ' + process.env.JWT_TOKEN,
    );

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual(defaultItem.name);
    expect(item.sku).toEqual(defaultItem.sku);
  });

  it('should return array of items', async () => {
    await controller.create(new CreateItemDto(defaultItem));
    const items = await controller.findAll(
      new ListItemsDto({ store_id: defaultItem.store_id }),
      'Bearer ' + process.env.JWT_TOKEN,
    );

    expect(items).toBeInstanceOf(Array);
    expect(items.length).toBeGreaterThan(0);
  });

  it('should update an item', async () => {
    const createdItem = await controller.create(new CreateItemDto(defaultItem));
    const item = await controller.update(createdItem.id, {
      ...defaultItem,
      name: 'updated',
    });

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.name).toEqual('updated');
  });

  it('should update an item status', async () => {
    const createdItem = await controller.create(new CreateItemDto(defaultItem));
    const item = await controller.updateStatus(createdItem.id, {
      status: 'APPROVED',
    });

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.status).toEqual('APPROVED');
  });

  it('should delete an item', async () => {
    const createdItem = await controller.create(new CreateItemDto(defaultItem));
    const item = await controller.remove(createdItem.id);
    const cutomerItems = await controller.findAll({}, '');

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.deletedAt).toEqual(expect.any(Date));
    expect(cutomerItems).not.toContainEqual(item);
  });
});
