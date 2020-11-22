import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { container } from 'tsyringe';

const appoitmentsRouter = Router();
appoitmentsRouter.use(ensureAuthenticaded);

appoitmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentServices);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

// appoitmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.status(200).json(appointments);
// });

export default appoitmentsRouter;
