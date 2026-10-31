import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ContactStatus } from '@rishu/shared-types';

export type ContactMessageDocument = ContactMessage & Document;

@Schema({ timestamps: true })
export class ContactMessage {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['new', 'read', 'archived'], default: 'new' })
  status: ContactStatus;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);
