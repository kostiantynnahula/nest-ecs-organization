import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PATIENT_SERVICE } from 'src/utils/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PATIENT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PATIENT_HOST'),
            port: configService.get('PATIENT_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
