import { HttpStatus, HttpException } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Role Not found', HttpStatus.NOT_FOUND);
  }
}
