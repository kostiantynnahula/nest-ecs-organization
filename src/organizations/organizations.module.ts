import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
