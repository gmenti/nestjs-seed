import momentTimezone from 'moment-timezone';
import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { JsonplaceholderService } from '../../jsonplaceholder/jsonplaceholder.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let jsonPlaceHolderService: JsonplaceholderService;

  beforeEach(async () => {
    const mockRepository = jest.fn(() => ({
      metadata: {
        columns: [],
        relations: [],
      },
      insertIfNotExists: jest.fn().mockResolvedValue(['1']),
    }));

    // tslint:disable-next-line:no-console
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: mockRepository },
        JsonplaceholderService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    jsonPlaceHolderService = module.get<JsonplaceholderService>(
      JsonplaceholderService,
    );
  });
  describe('#fetch', () => {
    it('should return users fetched', async () => {
      const users = [
        {
          id: '1',
          name: 'teste 1',
          username: 'testeteste',
          email: 'teste@test.com',
        },
      ];

      jest
        .spyOn(jsonPlaceHolderService, 'findUsers')
        // @ts-ignore
        .mockImplementation(async () => users);

      const result = await userService.fetch();
      expect(result).toEqual(['1']);
      expect(jsonPlaceHolderService.findUsers).toBeCalled();
      expect(userRepository.insertIfNotExists).toBeCalledWith(
        users.map(user => ({
          externalId: user.id.toString(),
          username: user.username,
          name: user.name,
          emailAddress: user.email,
        })),
      );
    });
  });
  // describe('#findByIdOrFail', () => {
  //   it('should return user by id', async () => {
  //     const now = Date.now();
  //     const user = {
  //       id: '1',
  //       externalId: '1',
  //       name: 'TESTE',
  //       username: 'TESTE',
  //       emailAddress: 'teste@gmail.com',
  //       createdAt: now,
  //       updatedAt: now,
  //     };
  //     jest
  //       .spyOn(userRepository, 'findOneOrFail')
  //       // @ts-ignore
  //       .mockImplementation(async () => user);
  //     const result = await userService.findByIdOrFail(user.id);
  //     expect(result).toEqual(user);
  //     expect(userRepository.findOneOrFail).toBeCalledWith(user.id);
  //   });
  // });

  // describe('#list', () => {
  //   it('should return user repository result', async () => {
  //     const mockData: User[] = [
  //       {
  //         id: '1',
  //         externalId: '2',
  //         name: 'Fualno de Tal',
  //         username: 'fulano_de_tal',
  //         emailAddress: 'fulano@gmail.com',
  //         createdAt: momentTimezone.utc().toDate(),
  //         updatedAt: momentTimezone.utc().toDate(),
  //       },
  //     ];

  //     jest
  //       .spyOn(userRepository, 'find')
  //       .mockImplementation(async () => mockData);

  //     const result = await userService.list();

  //     expect(result).toBe(mockData);
  //     expect(userRepository.find).toBeCalled();
  //   });
  // });
});
