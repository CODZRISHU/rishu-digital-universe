import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Service, ServiceDocument } from '../../schemas/service.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(@InjectModel(Service.name) private model: Model<ServiceDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get all active consulting and development services' })
  async getAll(): Promise<ApiResponse<any>> {
    const data = await this.model.find({ isActive: true }).sort({ order: 1 });
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
}
