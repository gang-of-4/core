import { ApiProperty } from '@nestjs/swagger';

export class GetManyVariantsDto {
  @ApiProperty()
  ids: string[];

  constructor(partial: Partial<GetManyVariantsDto>) {
    Object.assign(this, partial);
  }
}
