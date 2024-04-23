import { ApiProperty } from '@nestjs/swagger';

export class GetManyMediaDto {
  @ApiProperty()
  ids: string[];

  constructor(partial: Partial<GetManyMediaDto>) {
    Object.assign(this, partial);
  }
}
