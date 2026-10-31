import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../../schemas/booking.schema';
import { Service, ServiceSchema } from '../../schemas/service.schema';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [BookingsController],
  exports: [MongooseModule],
})
export class BookingsModule {}
