import CreateUserService from '@modules/users/services/CreateUserservice';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersControllers{
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.status(200).json(user);
  };
}