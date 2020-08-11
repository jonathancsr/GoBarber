import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const authenticatedUser = await authenticateUserService.execute({ email: 'user1@user.com', password: 'password' });

    expect(authenticatedUser).toHaveProperty('token');
    expect(authenticatedUser.user).toEqual(user);
  });

  it('should not be able to authenticate a user with password incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    await expect(authenticateUserService.execute(
      {
        email:
          'user1@user.com',
        password: 'qweqwe',
      },
    )).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a not exist user', async () => {
    const fakeHashProvider = new FakeHashProvider();

    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(authenticateUserService.execute({ email: 'user1@usaer.com', password: 'qweqwe' })).rejects.toBeInstanceOf(AppError);
  });
});
