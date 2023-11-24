import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBusinessStoreDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    vendorId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    logo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    vatNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    crNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ownerNationalId: string;

    constructor(partial: Partial<CreateBusinessStoreDto>) {
        Object.assign(this, partial);
    }
}
