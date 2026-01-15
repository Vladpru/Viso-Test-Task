import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body('title') title: string) {
    return this.projectService.create(title);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.getAll();
  }
}
