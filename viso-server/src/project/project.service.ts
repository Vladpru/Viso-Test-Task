import { BadRequestException, Injectable } from '@nestjs/common';
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
}
