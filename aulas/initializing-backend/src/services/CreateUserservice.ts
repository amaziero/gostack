import User from '../models/Users';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

interface RequestUser {
  name: string;
  email: string;
  password?: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email already used');
    }

    if (!password) {
      throw new AppError('You must pass the password', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
