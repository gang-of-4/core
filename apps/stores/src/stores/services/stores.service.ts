import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessStoreDto } from '../dto/create-business-store.dto';
import { UpdateBusinessStoreDto } from '../dto/update-business-store.dto';
import { StoreEntity } from '../entities/store.entity';
import { Status, Store, User } from '@prisma/client/stores';
import { UpdateStoreDto } from '../dto/update-store-dto';

@Injectable()
export class StoresService {
  constructor(
    private prisma: PrismaService,
  ) { }

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
    };

    return new StoreEntity(
      await this.prisma.store.create({
        data: {
          vendorId: createStoreDto.vendorId,
          status: createStoreDto.status || Status.PENDING,
          individualStore: {
            create: {}
          }
        },
        include: {
          individualStore: true,
        },
      })
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
              vat_number: createBusinessStoreDto.vatNumber,
              cr_number: createBusinessStoreDto.crNumber,
              owner_national_id: createBusinessStoreDto.ownerNationalId,
            }
          }
        },
        include: {
          businessStore: true,
        },
      })
    );
  }

  async findAll(): Promise<StoreEntity[]> {
    const stores = await this.prisma.store.findMany(
      {
        where: {
          deleted_at: null,
        },
        include: {
          individualStore: true,
          businessStore: true,
        },
      }
    );
    return stores.map((store) => new StoreEntity(store));
  }

  async findOne(id: Store['id']): Promise<StoreEntity> {
    return new StoreEntity(
      await this.prisma.store.findUnique({
        where: {
          id,
          deleted_at: null,
        },
        include: {
          individualStore: true,
          businessStore: true,
        },
      }),
    );
  };

  async findByVendor(id: User['id']): Promise<StoreEntity[]> {
    const stores = await this.prisma.store.findMany({
      where: {
        vendorId: id,
        deleted_at: null,
      },
      include: {
        individualStore: true,
        businessStore: true,
      },
    });
    return stores.map((store) => new StoreEntity(store));
  }

  async update(id: Store['id'], updateStoreDto: UpdateStoreDto): Promise<StoreEntity> {
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

  async updateBusiness(id: Store['id'], updateBusinessStoreDto: UpdateBusinessStoreDto) {
    return new StoreEntity(
      await this.prisma.store.update({
        where: {
          id,
          deleted_at: null,
        },
        data: {
          businessStore: {
            update: {
              name: updateBusinessStoreDto.name,
              logo: updateBusinessStoreDto.logo,
              vat_number: updateBusinessStoreDto.vatNumber,
              cr_number: updateBusinessStoreDto.crNumber,
              owner_national_id: updateBusinessStoreDto.ownerNationalId,
            }
          }
        },
        include: {
          businessStore: true,
        },
      })
    );
  }

  async remove(id: Store['id']) {
    return new StoreEntity(
      await this.prisma.store.update({
        where: {
          id,
        },
        data: {
          deleted_at: new Date(),
        },
      })
    );
  }

}
