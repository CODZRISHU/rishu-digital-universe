import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificationDocument = Certification & Document;

@Schema({ timestamps: true })
export class Certification {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  issuer: string;

  @Prop({ required: true })
  issueDate: string;

  @Prop()
  credentialUrl?: string;

  @Prop()
  verificationLink?: string;

  @Prop()
  badgeImage?: string;

  @Prop({ default: 0 })
  order: number;
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
