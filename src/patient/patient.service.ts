import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PATIENT_SERVICE, PatientServiceEvents } from 'src/utils/constants';

@Injectable()
export class PatientService {
  constructor(
    @Inject(PATIENT_SERVICE)
    private readonly patientClient: ClientProxy,
  ) {}

  async findAll() {
    const message = await this.patientClient.send(
      PatientServiceEvents.GET_PATIENTS,
      {},
    );

    return await firstValueFrom(message);
  }
}
