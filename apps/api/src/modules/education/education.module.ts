import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from '../../schemas/education.schema';
import { EducationController } from './education.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Education.name, schema: EducationSchema }])],
  controllers: [EducationController],
  exports: [MongooseModule],
})
export class EducationModule {}
