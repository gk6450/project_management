import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  NotificationsModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
