import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyObjectException extends HttpException {
  constructor() {
    super('Please provide at least one field', HttpStatus.BAD_REQUEST);
  }
}
