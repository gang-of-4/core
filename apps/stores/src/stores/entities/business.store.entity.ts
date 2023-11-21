import { ApiProperty } from '@nestjs/swagger';
import { BusinessStore, Store } from '@prisma/client/stores';
import { StoreEntity } from './store.entity';
import { Exclude, Type } from 'class-transformer';

export class BusinessStoreEntity implements BusinessStore {
    @ApiProperty()
    id: string;

    @Exclude()
    storeId: Store['id'];

    @ApiProperty({ type: StoreEntity })
    @Type(() => StoreEntity)
    store: StoreEntity;

    @ApiProperty()
    name: string;

    @ApiProperty()
    logo: string;

    @ApiProperty()
    vat_number: string;

    @ApiProperty()
    cr_number: string;

    @ApiProperty()
    owner_national_id: string;

    constructor(partial: Partial<BusinessStoreEntity>) {
        Object.assign(this, partial);
    }
}