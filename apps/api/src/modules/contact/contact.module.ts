import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactMessage, ContactMessageSchema } from '../../schemas/contact.schema';
import { ContactController } from './contact.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ContactMessage.name, schema: ContactMessageSchema }])],
  controllers: [ContactController],
  exports: [MongooseModule],
})
export class ContactModule {}
