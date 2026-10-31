import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WebsiteSettings, WebsiteSettingsDocument } from '../../schemas/settings.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(@InjectModel(WebsiteSettings.name) private model: Model<WebsiteSettingsDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get global website visual and SEO settings' })
  async getSettings(): Promise<ApiResponse<any>> {
    const data = await this.model.findOne();
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put()
  @ApiOperation({ summary: 'Update global website settings (Admin only)' })
  async updateSettings(@Body() body: any): Promise<ApiResponse<any>> {
    const data = await this.model.findOneAndUpdate({}, body, { new: true, upsert: true });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
