import { HttpStatus, HttpException } from '@nestjs/common';

export class SlugExistsException extends HttpException {
  constructor() {
    super('Item slug already exists', HttpStatus.BAD_REQUEST);
  }
}
