import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepossitories from '@modules/users/repositories/IUsersRepositories';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)

    if (!users) {
      users = await this.usersRepository
        .findAllProviders({ except_user_id: user_id });

      await this.cacheProvider.save(`providers-list:${user_id}`, users)
    }

    return users;
  }
}

export default ListProviderService;
