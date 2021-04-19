import Appointment from '../../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string):
    Promise<Appointment | undefined> {
    const findAppointment = this.appointments
      .find(appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
      )

    return findAppointment;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id })

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointment = this.appointments
      .filter(appointment => {
        return (
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        )
      })

    return appointment
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointment = this.appointments
      .filter(appointment => {
        return (
          appointment.provider_id === provider_id &&
          getDate(appointment.date) === day &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        )
      }
      )

    return appointment
  }
}

export default AppointmentsRepository;
