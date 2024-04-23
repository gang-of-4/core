import { HttpStatus, HttpException } from '@nestjs/common';

export class ImageUsedException extends HttpException {
  constructor() {
    super('Image already used with another item', HttpStatus.BAD_REQUEST);
  }
}
