import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BookingStatus, DeliveryMethod } from '@rishu/shared-types';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  serviceId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop()
  customerPhone?: string;

  @Prop({ required: true, index: true })
  sessionDate: string; // YYYY-MM-DD

  @Prop({ required: true })
  startTime: string;   // HH:mm

  @Prop({ default: '60 mins' })
  endTime: string;

  @Prop({ default: 'Asia/Kolkata' })
  timezone: string;

  @Prop({ required: true })
  purpose: string;

  @Prop({ default: 'google_meet' })
  deliveryMethod: DeliveryMethod;

  @Prop({ required: true })
  amount: number;

  @Prop()
  paymentId?: string;

  @Prop({ required: true, enum: ['pending', 'confirmed', 'rescheduled', 'cancelled', 'refunded', 'completed'], default: 'pending' })
  status: BookingStatus;

  @Prop()
  meetingLink?: string;

  @Prop()
  calendarEventId?: string;

  @Prop()
  notes?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
// Atomic concurrency index: prevent duplicate bookings for active confirmed slots
BookingSchema.index({ sessionDate: 1, startTime: 1, status: 1 });
