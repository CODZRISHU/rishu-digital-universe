import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsEvent, AnalyticsEventSchema } from '../../schemas/analytics.schema';
import { Project, ProjectSchema } from '../../schemas/project.schema';
import { Booking, BookingSchema } from '../../schemas/booking.schema';
import { ContactMessage, ContactMessageSchema } from '../../schemas/contact.schema';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsEvent.name, schema: AnalyticsEventSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: ContactMessage.name, schema: ContactMessageSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  exports: [MongooseModule],
})
export class AnalyticsModule {}
