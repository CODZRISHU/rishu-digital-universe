import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  departmentOrClient?: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  startDate: string;

  @Prop()
  endDate?: string;

  @Prop({ default: false })
  isCurrent: boolean;

  @Prop({ type: [String], default: [] })
  responsibilities: string[];

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop({ default: 0 })
  order: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
