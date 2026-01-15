import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(title: string) {
    const existingProject = await this.prisma.project.findUnique({
      where: { title },
    });
    if (existingProject) {
      throw new BadRequestException('Project already exists');
    }
    return await this.prisma.project.create({
      data: { title },
    });
  }

  async getAll() {
    const projects = await this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!projects)
      throw new NotFoundException('Not found any projects');
    return projects;
  }
}
