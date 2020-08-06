import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';


describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });


  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    expect(createUserService.execute({
      name: 'User 2',
      email: 'user1@user.com',
      password: 'passsword',
    })).rejects.toBeInstanceOf(AppError);
  });
});
