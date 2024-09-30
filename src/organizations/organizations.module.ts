import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PATIENT_SERVICE } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';
import { PatientModule } from 'src/patient/patient.module';
import { PatientService } from 'src/patient/patient.service';

@Module({
  imports: [
    PrismaModule,
    PatientModule,
    ClientsModule.registerAsync([
      {
        name: PATIENT_SERVICE,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get('PATIENT_HOST'),
              port: configService.get('PATIENT_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, PatientService],
})
export class OrganizationsModule {}
