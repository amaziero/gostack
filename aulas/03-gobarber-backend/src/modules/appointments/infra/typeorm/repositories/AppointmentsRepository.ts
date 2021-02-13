// In this abastraction structure the AppointmentsRepository is responsable for
// interact with the object itself on the data base, all thigs like:
// create, list, delete and change an Appointment, will have most of it's logic
// here.
import "reflect-metadata"
import Appointment from '../entities/Appointments';
import { getRepository, Repository, Raw } from 'typeorm';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0')

    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldname =>
          `to_char(${dateFieldname}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      },
    })

    return appointment
  }
}

export default AppointmentsRepository;
