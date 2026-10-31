import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SkillCategory } from '@rishu/shared-types';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: SkillCategory;

  @Prop({ required: true, min: 0, max: 100 })
  proficiency: number;

  @Prop()
  icon?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
