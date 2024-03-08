import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HeroesService {
  @GrpcMethod()
  findOne(data: any) {
    console.log(data);
    return {
      id: 1,
      name: 'h',
    };
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
