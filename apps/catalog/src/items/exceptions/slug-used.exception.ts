import { HttpStatus, HttpException } from '@nestjs/common';

export class SlugUsedException extends HttpException {
  constructor() {
    super('Item slug already used', HttpStatus.BAD_REQUEST);
  }
}
