import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EducationDocument = Education & Document;

@Schema({ timestamps: true })
export class Education {
  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  grade: string;

  @Prop({ type: [String], default: [] })
  activities: string[];

  @Prop({ default: 0 })
  order: number;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
