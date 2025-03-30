import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  projectManager: string;

  @Prop({ required: true })
  status: string;          
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
