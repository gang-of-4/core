import { ApiProperty } from '@nestjs/swagger';

export class GetManyItemsDto {
  @ApiProperty()
  ids: string[];

  constructor(partial: Partial<GetManyItemsDto>) {
    Object.assign(this, partial);
  }
}
