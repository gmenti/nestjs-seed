import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JsonplaceholderService } from '../jsonplaceholder/jsonplaceholder.service';
import { User } from './user.entity';
import { ResourceNotFoundError } from 'src/shared/exceptions/resource-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonplaceholderService: JsonplaceholderService,
  ) {}

  async fetch(): Promise<string[]> {
    const externalUsers = await this.jsonplaceholderService.findUsers();
    return await this.userRepository.insertIfNotExists(
      externalUsers.map(externalUser => ({
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      })),
    );
  }

  async list() {
    return await this.userRepository.find();
  }

  async listById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return user;
  }
}
