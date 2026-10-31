import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../../schemas/payment.schema';
import { Booking, BookingSchema } from '../../schemas/booking.schema';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
  controllers: [PaymentsController],
  exports: [MongooseModule],
})
export class PaymentsModule {}
