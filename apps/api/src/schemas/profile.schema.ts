import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  tagline: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: '/assets/rishu-avatar.svg' })
  avatarUrl: string;

  @Prop({ default: '/assets/rishu-photo.png' })
  photoUrl: string;

  @Prop({ type: Object, default: {} })
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    website?: string;
  };

  @Prop({ default: '/resume.pdf' })
  resumeUrl: string;

  @Prop({ default: '1+ Years' })
  yearsOfExperience: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
