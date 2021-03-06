import User from '../entities/Users';
import { getRepository, Repository, Not } from 'typeorm';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import usersRouter from '../../http/routes/users.routes';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepositories implements IUsersRepositories {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[] = []

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      })
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  };

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  };

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email }
    });

    return user;
  };

  public async create({ name, email, password }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  };
}

export default UsersRepositories;
