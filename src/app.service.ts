import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Jomoro Koffee Auth Service API is Running';
  }
}
