import { Injectable, HttpService } from '@nestjs/common';
import { JsonplaceholderUser } from './interfaces/jsonplaceholder-user.interface';

@Injectable()
export class JsonplaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async findUsers(): Promise<JsonplaceholderUser[]> {
    const response = await this.httpService
      .get<JsonplaceholderUser[]>('/users')
      .toPromise();
    return response.data.map(({ id, name, username, email }) => ({
      id,
      name,
      username,
      email,
    }));
  }
}
