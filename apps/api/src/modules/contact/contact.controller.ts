import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactMessage, ContactMessageDocument } from '../../schemas/contact.schema';
import { TelegramService } from '../telegram/telegram.service';
import { ICreateContactDto, ApiResponse } from '@rishu/shared-types';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(
    @InjectModel(ContactMessage.name) private model: Model<ContactMessageDocument>,
    private telegramService: TelegramService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact message inquiry' })
  async createMessage(@Body() dto: ICreateContactDto): Promise<ApiResponse<any>> {
    const msg = await this.model.create(dto);

    // Dispatch instant alert to Telegram chat
    this.telegramService.sendContactNotification({
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
    }).catch(() => {});

    return {
      success: true,
      data: msg,
      message: 'Message delivered to Rishu Kumar Jha successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('admin/all')
  @ApiOperation({ summary: 'Get all contact messages' })
  async getAllAdmin(): Promise<ApiResponse<any>> {
    const data = await this.model.find().sort({ createdAt: -1 });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
