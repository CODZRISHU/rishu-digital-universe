import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteSettings, WebsiteSettingsSchema } from '../../schemas/settings.schema';
import { SettingsController } from './settings.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: WebsiteSettings.name, schema: WebsiteSettingsSchema }])],
  controllers: [SettingsController],
  exports: [MongooseModule],
})
export class SettingsModule {}
