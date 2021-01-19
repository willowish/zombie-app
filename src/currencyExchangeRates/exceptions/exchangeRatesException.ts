import { HttpException } from '@nestjs/common';

export class ExchangeRatesException extends HttpException {
  constructor(message: string, status: number) {
    super(message || 'Unable to get exchange rates', status || 504);
  }
}
