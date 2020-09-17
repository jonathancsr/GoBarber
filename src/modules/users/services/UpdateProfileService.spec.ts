import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    await expect(
      updateProfileService.execute({
        user_id: '23123123213465412',
        name: 'Thre Jonh',
        email: 'user1@user.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Thre Jonh',
      email: 'threjohn@email.com',
    });

    expect(updatedUser.name).toEqual('Thre Jonh');
    expect(updatedUser.email).toEqual('threjohn@email.com');
  });

  it('should be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Thre Jonh',
        email: 'threjohn@email.com',
        old_password: 'wrong old password',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile with non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non existing user id',
        name: 'Thre Jonh',
        email: 'user1@user.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Thre Jonh',
      email: 'threjohn@email.com',
      old_password: 'password',
      password: '123456',
    });

    expect(updatedUser.password).toEqual('123456');
  });
});
