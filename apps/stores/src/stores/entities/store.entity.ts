import { Store, Status } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class StoreEntity implements Store {
    @ApiProperty()
    id: string;

    @ApiProperty()
    vendorId: string;

    @ApiProperty({ default: Status.PENDING })
    status: Status;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty({ nullable: true, default: null })
    @Expose({ groups: ['stores.delete', 'self'] })
    deleted_at: Date;

    constructor(partial: Partial<StoreEntity>) {
        Object.assign(this, partial);
    }
}
