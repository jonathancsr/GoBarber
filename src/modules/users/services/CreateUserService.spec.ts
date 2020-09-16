import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    await expect(
      createUserService.execute({
        name: 'User 2',
        email: 'user1@user.com',
        password: 'passsword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
