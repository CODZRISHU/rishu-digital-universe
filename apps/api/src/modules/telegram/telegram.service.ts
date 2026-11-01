import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private botToken: string | undefined;
  private chatId: string | undefined;
  private readonly phoneNumber: string = '9304783530';

  constructor(private configService: ConfigService) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
  }

  setConfig(token: string, chatId: string) {
    if (token) this.botToken = token.trim();
    if (chatId) this.chatId = chatId.trim();
    this.logger.log(`Telegram configuration updated dynamically. Chat ID: ${this.chatId}`);
  }

  getStatus() {
    const token = this.botToken || this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const chat = this.chatId || this.configService.get<string>('TELEGRAM_CHAT_ID');

    return {
      configured: Boolean(token && chat),
      phoneNumber: this.phoneNumber,
      chatId: chat ? `${chat.slice(0, 4)}...${chat.slice(-3)}` : null,
      hasBotToken: Boolean(token),
    };
  }

  async sendBookingNotification(booking: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    serviceId: string;
    sessionDate: string;
    startTime: string;
    purpose: string;
    amount?: number;
  }): Promise<boolean> {
    const text = `
⚡ <b>NEW 1-ON-1 APPOINTMENT BOOKED!</b> ⚡
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Client:</b> ${booking.customerName}
📧 <b>Email:</b> ${booking.customerEmail}
📱 <b>Phone:</b> ${booking.customerPhone || 'Not provided'}
🎯 <b>Session Topic:</b> ${booking.serviceId}
📅 <b>Date:</b> ${booking.sessionDate}
⏰ <b>Time Slot:</b> ${booking.startTime}
📝 <b>Purpose / Objectives:</b>
<i>${booking.purpose}</i>
━━━━━━━━━━━━━━━━━━━━━━
🌐 <b>Platform:</b> Google Meet Video Call
🚀 <i>Rishu Jha — Personal Digital Universe</i>
    `.trim();

    return this.sendMessage(text);
  }

  async sendContactNotification(contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    const text = `
✉️ <b>NEW CONTACT INQUIRY RECEIVED!</b> ✉️
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${contact.name}
📧 <b>Email:</b> ${contact.email}
📌 <b>Subject:</b> ${contact.subject}
💬 <b>Message:</b>
<i>${contact.message}</i>
━━━━━━━━━━━━━━━━━━━━━━
🚀 <i>Rishu Jha — Personal Digital Universe</i>
    `.trim();

    return this.sendMessage(text);
  }

  async sendTestNotification(): Promise<{ ok: boolean; message: string }> {
    const text = `
🔔 <b>TELEGRAM NOTIFICATIONS ACTIVE!</b> 🔔
━━━━━━━━━━━━━━━━━━━━━━
👋 Hello Rishu Kumar Jha (+91 9304783530)!
Your Personal Digital Universe is now successfully connected to Telegram.

You will receive real-time instant alerts whenever:
• A client books a 1-on-1 engineering consultation
• A recruiter or visitor submits an inquiry on your portfolio
• Any contact or transmission is submitted

🌌 <i>Mission Control online and transmitting normally.</i>
    `.trim();

    const ok = await this.sendMessage(text);
    if (ok) {
      return { ok: true, message: 'Test notification sent to Telegram successfully!' };
    } else {
      return {
        ok: false,
        message: 'Notification queued in server console. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to receive alerts on phone.',
      };
    }
  }

  async sendMessage(htmlText: string): Promise<boolean> {
    const token = this.botToken || this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const chat = this.chatId || this.configService.get<string>('TELEGRAM_CHAT_ID');

    if (!token || !chat) {
      this.logger.warn(
        `[Telegram Alert] Not configured with TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. Target phone: 9304783530`
      );
      this.logger.log(`\n================== TELEGRAM ALERT PREVIEW ==================\n${htmlText.replace(/<[^>]*>/g, '')}\n============================================================\n`);
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chat,
          text: htmlText,
          parse_mode: 'HTML',
        }),
      });

      const resData = (await response.json()) as any;
      if (resData.ok) {
        this.logger.log(`✅ Telegram alert dispatched successfully to chat ID: ${chat}`);
        return true;
      } else {
        this.logger.error(`Failed to send Telegram message: ${resData.description}`);
        return false;
      }
    } catch (err: any) {
      this.logger.error(`Error connecting to Telegram API: ${err.message}`);
      return false;
    }
  }
}
