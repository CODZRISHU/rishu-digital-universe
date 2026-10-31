import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServiceCategory, DeliveryMethod } from '@rishu/shared-types';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 60 })
  durationMinutes: number;

  @Prop({ required: true })
  category: ServiceCategory;

  @Prop({ required: true, default: 'google_meet' })
  deliveryMethod: DeliveryMethod;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop()
  icon?: string;

  @Prop({ default: 0 })
  order: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
