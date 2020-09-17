import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers with except user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User 2',
      email: 'user2@user.com',
      password: 'password',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'User 3',
      email: 'user3@user.com',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged.user@user.com',
      password: 'password',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2, user3]);
  });
});
