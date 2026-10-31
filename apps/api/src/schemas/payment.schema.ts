import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentStatus } from '@rishu/shared-types';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, index: true })
  bookingId: string;

  @Prop({ required: true, unique: true })
  razorpayOrderId: string;

  @Prop()
  razorpayPaymentId?: string;

  @Prop()
  razorpaySignature?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'INR' })
  currency: string;

  @Prop({ required: true, enum: ['created', 'authorized', 'captured', 'failed', 'refunded'], default: 'created' })
  status: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
