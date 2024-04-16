import { ApiProperty } from '@nestjs/swagger';

export class GetManyMediaDto {
  @ApiProperty()
  ids: Array<string>;

  constructor(partial: Partial<GetManyMediaDto>) {
    Object.assign(this, partial);
  }
}
