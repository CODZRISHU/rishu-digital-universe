import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteSettingsDocument = WebsiteSettings & Document;

@Schema({ timestamps: true })
export class WebsiteSettings {
  @Prop({ default: "HEY, I'M RISHU JHA." })
  heroHeadline: string;

  @Prop({ default: 'Software Engineer | Full Stack Developer | AI Enthusiast' })
  heroTagline: string;

  @Prop({ default: 'Building scalable enterprise applications, intelligent voice products and digital universes.' })
  heroSubtext: string;

  @Prop({ default: '#A855F7' })
  accentColor: string;

  @Prop({ default: '#00D9FF' })
  secondaryAccent: string;

  @Prop({ default: true })
  enableBookings: boolean;

  @Prop({ default: true })
  enableTestimonials: boolean;

  @Prop({ default: 'Rishu Jha — Personal Digital Universe' })
  seoTitle: string;

  @Prop({ default: 'Personal portfolio and engineering universe of Rishu Kumar Jha.' })
  seoDescription: string;

  @Prop({ type: [String], default: ['Rishu Jha', 'Full Stack Developer', 'Cognizant', 'Spring Boot', 'Angular', 'AI Engineer'] })
  seoKeywords: string[];

  @Prop({ default: 'https://github.com/CODZRISHU' })
  githubUrl: string;

  @Prop({ default: 'https://www.linkedin.com/in/rishu-kumar-jha-51741328a' })
  linkedinUrl: string;

  @Prop({ default: 'shivayjha7@gmail.com' })
  email: string;
}

export const WebsiteSettingsSchema = SchemaFactory.createForClass(WebsiteSettings);
