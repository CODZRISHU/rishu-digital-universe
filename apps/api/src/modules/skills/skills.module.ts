import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from '../../schemas/skill.schema';
import { SkillsController } from './skills.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }])],
  controllers: [SkillsController],
  exports: [MongooseModule],
})
export class SkillsModule {}
