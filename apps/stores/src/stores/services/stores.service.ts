import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessStoreDto } from '../dto/create-business-store.dto';
import { UpdateBusinessStoreDto } from '../dto/update-business-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { Status, Store } from '@prisma/client/stores';
import { UpdateStoreDto } from '../dto/update-store-dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async createIndividual(createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    const stores = await this.findByVendor(createStoreDto.vendorId);

    for (const store of stores) {
      const individualStore = await this.prisma.individualStore.findUnique({
        where: {
          storeId: store.id,
        },
      });
      if (individualStore) {
        throw new Error('Vendor already has an individual store');
      }
    }

    return new StoreEntity(
      await this.prisma.store.create({
        data: {
          vendorId: createStoreDto.vendorId,
          status: createStoreDto.status || Status.PENDING,
          individualStore: {
            create: {},
          },
        },
        include: {
          individualStore: true,
        },
      }),
    );
  }

  async createBusiness(createBusinessStoreDto: CreateBusinessStoreDto) {
    return new StoreEntity(
      await this.prisma.store.create({
        data: {
          vendorId: createBusinessStoreDto.vendorId,
          status: Status.PENDING,
          businessStore: {
            create: {
              name: createBusinessStoreDto.name,
              logo: createBusinessStoreDto.logo,
              vatNumber: createBusinessStoreDto.vatNumber,
              crNumber: createBusinessStoreDto.crNumber,
              ownerNationalId: createBusinessStoreDto.ownerNationalId,
            },
          },
        },
        include: {
          businessStore: true,
        },
      }),
    );
  }

  async findAll(): Promise<StoreEntity[]> {
    const stores = await this.prisma.store.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        individualStore: true,
        businessStore: true,
      },
    });
    return stores.map((store) => new StoreEntity(store));
  }

  async findOne(id: Store['id']): Promise<StoreEntity> {
    return new StoreEntity(
      await this.prisma.store.findUnique({
        where: {
          id,
          deletedAt: null,
        },
        include: {
          individualStore: true,
          businessStore: true,
        },
      }),
    );
  }

  async findByVendor(id: Store['vendorId']): Promise<StoreEntity[]> {
    const stores = await this.prisma.store.findMany({
      where: {
        vendorId: id,
        deletedAt: null,
      },
      include: {
        individualStore: true,
        businessStore: true,
      },
    });
    return stores.map((store) => new StoreEntity(store));
  }

  async update(
    id: Store['id'],
    updateStoreDto: UpdateStoreDto,
  ): Promise<StoreEntity> {
    return new StoreEntity(
      await this.prisma.store.update({
        where: {
          id,
        },
        data: {
          status: updateStoreDto.status,
        },
      }),
    );
  }

  async updateBusiness(
    id: Store['id'],
    updateBusinessStoreDto: UpdateBusinessStoreDto,
  ) {
    return new StoreEntity(
      await this.prisma.store.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          status: Status.PENDING,
          businessStore: {
            update: {
              name: updateBusinessStoreDto.name,
              logo: updateBusinessStoreDto.logo,
              vatNumber: updateBusinessStoreDto.vatNumber,
              crNumber: updateBusinessStoreDto.crNumber,
              ownerNationalId: updateBusinessStoreDto.ownerNationalId,
            },
          },
        },
        include: {
          businessStore: true,
        },
      }),
    );
  }

  async remove(id: Store['id']) {
    return new StoreEntity(
      await this.prisma.store.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    );
  }
}
