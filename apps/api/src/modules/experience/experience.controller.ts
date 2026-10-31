import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Experience, ExperienceDocument } from '../../schemas/experience.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(@InjectModel(Experience.name) private model: Model<ExperienceDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get career timeline (Cognizant, CodeAlpha, IIT Patna)' })
  async getAll(): Promise<ApiResponse<any>> {
    const data = await this.model.find().sort({ order: 1 });
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() body: any): Promise<ApiResponse<any>> {
    const data = await this.model.create(body);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any): Promise<ApiResponse<any>> {
    const data = await this.model.findByIdAndUpdate(id, body, { new: true });
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse<any>> {
    await this.model.findByIdAndDelete(id);
    return { success: true, message: 'Experience deleted', timestamp: new Date().toISOString() };
  }
}
