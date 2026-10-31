import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Education, EducationDocument } from '../../schemas/education.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(@InjectModel(Education.name) private model: Model<EducationDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get academic background (CUSAT, DAV Nandraj)' })
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
}
