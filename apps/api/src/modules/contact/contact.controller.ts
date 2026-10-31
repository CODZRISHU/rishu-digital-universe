import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactMessage, ContactMessageDocument } from '../../schemas/contact.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { ICreateContactDto, ApiResponse } from '@rishu/shared-types';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(@InjectModel(ContactMessage.name) private model: Model<ContactMessageDocument>) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact message inquiry' })
  async createMessage(@Body() dto: ICreateContactDto): Promise<ApiResponse<any>> {
    const msg = await this.model.create(dto);
    return {
      success: true,
      data: msg,
      message: 'Message delivered to Rishu Kumar Jha successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/all')
  @ApiOperation({ summary: 'Get all contact messages (Admin only)' })
  async getAllAdmin(): Promise<ApiResponse<any>> {
    const data = await this.model.find().sort({ createdAt: -1 });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
