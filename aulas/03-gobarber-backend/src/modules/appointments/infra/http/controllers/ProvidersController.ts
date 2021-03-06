import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderService from '@modules/appointments/services/ListProviderServices';

export default class ProvidersController {
  public async index(request: Request, response: Response) {
    const user_id = request.user.id

    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute({
      user_id
    });

    return response.json(providers);

  }
}
