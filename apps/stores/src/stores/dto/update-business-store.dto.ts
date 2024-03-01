import { PartialType } from "@nestjs/mapped-types";
import { CreateBusinessStoreDto } from "./create-business-store.dto";

export class UpdateBusinessStoreDto extends PartialType(CreateBusinessStoreDto) {}