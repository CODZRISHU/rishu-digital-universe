import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectCategory } from '@rishu/shared-types';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  category: ProjectCategory;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  longDescription: string;

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ default: '' })
  coverImage: string;

  @Prop({ type: [String], default: [] })
  screenshots: string[];

  @Prop()
  githubUrl?: string;

  @Prop()
  liveUrl?: string;

  @Prop()
  architectureNotes?: string;

  @Prop()
  challenges?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
