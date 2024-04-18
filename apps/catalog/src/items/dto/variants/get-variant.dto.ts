import { ApiProperty } from '@nestjs/swagger';

export class GetVariantDto {
  @ApiProperty()
  id: string;

  constructor(partial: Partial<GetVariantDto>) {
    Object.assign(this, partial);
  }
}
