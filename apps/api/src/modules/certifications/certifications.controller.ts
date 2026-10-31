import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Certification, CertificationDocument } from '../../schemas/certification.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Certifications')
@Controller('certifications')
export class CertificationsController {
  constructor(@InjectModel(Certification.name) private model: Model<CertificationDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get accredited certifications (OCI, Claude, Gemini)' })
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
