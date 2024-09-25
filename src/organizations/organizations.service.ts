import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    return await this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  async findAll() {
    return await this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return await this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.organization.delete({
      where: { id },
    });
  }
}
