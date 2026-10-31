import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from '../../schemas/experience.schema';
import { ExperienceController } from './experience.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }])],
  controllers: [ExperienceController],
  exports: [MongooseModule],
})
export class ExperienceModule {}
