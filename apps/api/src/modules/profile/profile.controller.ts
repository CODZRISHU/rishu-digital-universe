import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Profile, ProfileDocument } from '../../schemas/profile.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(@InjectModel(Profile.name) private model: Model<ProfileDocument>) {}

  @Get()
  @ApiOperation({ summary: 'Get Rishu Jha verified professional profile' })
  async getProfile(): Promise<ApiResponse<any>> {
    const data = await this.model.findOne();
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put()
  @ApiOperation({ summary: 'Update profile (Admin only)' })
  async updateProfile(@Body() body: any): Promise<ApiResponse<any>> {
    const data = await this.model.findOneAndUpdate({}, body, { new: true, upsert: true });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
