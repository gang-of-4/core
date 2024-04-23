import { ApiProperty } from '@nestjs/swagger';

export class GetItemDto {
  @ApiProperty()
  id: string;

  constructor(partial: Partial<GetItemDto>) {
    Object.assign(this, partial);
  }
}
