import { HttpStatus, HttpException } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('User Not found', HttpStatus.NOT_FOUND);
  }
}
