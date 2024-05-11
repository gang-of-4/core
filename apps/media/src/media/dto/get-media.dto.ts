import { ApiProperty } from '@nestjs/swagger';

export class GetMediaDto {
  @ApiProperty()
  id: string;

  constructor(partial: Partial<GetMediaDto>) {
    Object.assign(this, partial);
  }
}
