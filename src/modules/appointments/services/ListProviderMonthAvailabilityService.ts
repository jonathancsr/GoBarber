import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      );

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    console.log(eachDayArray);

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
