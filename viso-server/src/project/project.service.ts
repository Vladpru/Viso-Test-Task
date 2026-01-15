import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  private readonly defaultProjects = [
    'Client A',
    'Personal Pet Project',
    'API Integration',
    'Client B',
  ];

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
    let projects = await this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (projects.length === 0) {
      for (const title of this.defaultProjects) {
        await this.prisma.project.create({
          data: { title },
        });
      }
      projects = await this.prisma.project.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return projects;
  }
}
