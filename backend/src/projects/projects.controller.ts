import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private notificationsGateway: NotificationsGateway,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { title: string; description: string; projectManager: string; status: string }, @Request() req) {
    if (req.user.role !== 'Admin') {
      throw new ForbiddenException('Only admins can create projects');
    }

    const project = await this.projectsService.create(body);
    this.notificationsGateway.notifyAll(`Project "${project.title}" was created.`);
    return project;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { title?: string; description?: string; projectManager?: string; status?: string }, @Request() req) {
    if (req.user.role !== 'Admin') {
      throw new ForbiddenException('Only admins can update projects');
    }
    const project = await this.projectsService.update(id, body);
    this.notificationsGateway.notifyAll(`Project "${project.title}" was updated.`);
    return project;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'Admin') {
      throw new ForbiddenException('Only admins can delete projects');
    }
    const project = await this.projectsService.delete(id);
    this.notificationsGateway.notifyAll(`Project "${project.title}" was deleted.`);
    return project;
  }
}
