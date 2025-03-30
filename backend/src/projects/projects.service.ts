import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }


  async create(projectDto: { title: string; description: string; projectManager: string; status: string }): Promise<Project> {
    const createdProject = new this.projectModel(projectDto);
    return createdProject.save();
  }

  async update(id: string, projectDto: { title?: string; description?: string; projectManager?: string; status?: string }): Promise<Project> {
    const project = await this.projectModel.findByIdAndUpdate(id, projectDto, { new: true });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async delete(id: string): Promise<Project> {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
