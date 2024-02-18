import { ApiProperty } from '@nestjs/swagger';
import { IndividualStore, Store } from '@prisma/client/stores';
import { Exclude } from 'class-transformer';

export class IndividualStoreEntity implements IndividualStore {
  @ApiProperty()
  id: string;

  @Exclude()
  storeId: Store['id'];

  constructor(partial: Partial<IndividualStoreEntity>) {
    Object.assign(this, partial);
  }
}
