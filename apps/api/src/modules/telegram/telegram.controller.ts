import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get Telegram notification service status' })
  getStatus() {
    return {
      success: true,
      data: this.telegramService.getStatus(),
      timestamp: new Date().toISOString(),
    };
  }

  @Post('config')
  @ApiOperation({ summary: 'Dynamically update Telegram bot token and chat ID' })
  updateConfig(@Body() body: { botToken: string; chatId: string }) {
    this.telegramService.setConfig(body.botToken, body.chatId);
    return {
      success: true,
      data: this.telegramService.getStatus(),
      message: 'Telegram notification configuration updated',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('test')
  @ApiOperation({ summary: 'Send a test notification to Telegram' })
  async sendTest() {
    const result = await this.telegramService.sendTestNotification();
    return {
      success: result.ok,
      message: result.message,
      timestamp: new Date().toISOString(),
    };
  }
}