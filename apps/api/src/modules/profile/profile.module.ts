import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../../schemas/profile.schema';
import { ProfileController } from './profile.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
  controllers: [ProfileController],
  exports: [MongooseModule],
})
export class ProfileModule {}
