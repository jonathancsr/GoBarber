import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@user.com',
      password: 'password',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toEqual('User 1');
    expect(profile.email).toEqual('user1@user.com');
  });

  it('should be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non existing user id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
