import { ApiProperty } from "@nestjs/swagger";
import { IndividualStore, Store } from "@prisma/client";
import { StoreEntity } from "./store.entity";
import { Exclude, Type } from "class-transformer";

export class IndividualStoreEntity implements IndividualStore {
    @ApiProperty()
    id: string;

    @Exclude()
    storeId: Store['id'];

    constructor (partial: Partial<IndividualStoreEntity>, store: StoreEntity) {
        Object.assign(this, partial);
    }
}