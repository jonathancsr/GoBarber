import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const authenticatedUser = await authenticateUserService.execute({
      email: 'user1@user.com',
      password: 'password',
    });

    expect(authenticatedUser).toHaveProperty('token');
    expect(authenticatedUser.user).toEqual(user);
  });

  it('should not be able to authenticate a user with password incorrect', async () => {
    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    await expect(
      authenticateUserService.execute({
        email: 'user1@user.com',
        password: 'qweqwe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a not exist user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'user1@usaer.com',
        password: 'qweqwe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
