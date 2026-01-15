import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  TimeEntryDto,
  UpdateTimeEntryDto,
} from './dto/time-entry.dto';

@Injectable()
export class TimeEntryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const timeEntries = await this.prisma.timeEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!timeEntries)
      throw new NotFoundException('Not found any Time Entries');
    return timeEntries;
  }

  async getById(id: string) {
    const timeEntry = await this.prisma.timeEntry.findUnique({
      where: {
        id,
      },
    });
    if (!timeEntry)
      throw new NotFoundException('Not found Time Entry');
    return timeEntry;
  }

  async create(dto: TimeEntryDto) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });
    if (!existingProject) {
      throw new BadRequestException('Project does not exist');
    }
    return this.prisma.timeEntry.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateTimeEntryDto) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });
    if (!existingProject) {
      throw new BadRequestException('Project does not exist');
    }
    return this.prisma.timeEntry.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        date: dto.date,
        description: dto.description,
        hours: dto.hours,
        projectId: dto.projectId,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.timeEntry.delete({
      where: { id },
    });
  }
}
