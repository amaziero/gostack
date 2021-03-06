import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepossitories from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found')
    }

    return user;
  }
}

export default ShowProfileService;
