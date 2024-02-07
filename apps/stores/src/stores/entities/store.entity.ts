import { Store, Status } from '@prisma/client/stores';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StoreEntity implements Store {
  @ApiProperty()
  id: string;

  @ApiProperty()
  vendorId: string;

  @ApiProperty({ default: Status.PENDING })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['stores.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<StoreEntity>) {
    Object.assign(this, partial);
  }
}
