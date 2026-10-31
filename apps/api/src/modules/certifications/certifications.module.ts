import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Certification, CertificationSchema } from '../../schemas/certification.schema';
import { CertificationsController } from './certifications.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Certification.name, schema: CertificationSchema }])],
  controllers: [CertificationsController],
  exports: [MongooseModule],
})
export class CertificationsModule {}
