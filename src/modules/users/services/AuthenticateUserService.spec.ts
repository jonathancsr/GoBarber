import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';


describe('AuthenticateUser', () => {
  it('should be able to authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const authenticatedUser = await authenticateUserService.execute({ email: 'user1@user.com', password: 'password' });


    expect(authenticatedUser).toHaveProperty('token');
  });

  it('should not be able to authenticate a user with password incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    expect(authenticateUserService.execute({ email: 'user1@user.com', password: 'qweqwe' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a not exist user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository);

    expect(authenticateUserService.execute({ email: 'user1@usaer.com', password: 'qweqwe' })).rejects.toBeInstanceOf(AppError);
  });
});
