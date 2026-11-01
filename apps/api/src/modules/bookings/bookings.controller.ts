import { Controller, Get, Post, Patch, Body, Query, Param, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { Service, ServiceDocument } from '../../schemas/service.schema';
import { TelegramService } from '../telegram/telegram.service';
import { ICreateBookingDto, ApiResponse } from '@rishu/shared-types';

const STANDARD_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:30 PM - 01:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
  '08:00 PM - 09:00 PM',
  '09:30 PM - 10:30 PM',
];

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    private telegramService: TelegramService,
  ) {}

  @Get('slots')
  @ApiOperation({ summary: 'Get available time slots for a given date (Weekends 11am - 11pm only)' })
  async getAvailableSlots(@Query('date') date: string): Promise<ApiResponse<any>> {
    if (!date) {
      date = new Date().toISOString().split('T')[0];
    }

    // Validate weekend (Saturday or Sunday only)
    const [y, m, d] = date.split('-').map(Number);
    const dateObj = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = dateObj.getUTCDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      return { 
        success: true, 
        data: [], 
        message: 'Sessions are strictly hosted on weekends (Saturday & Sunday) between 11:00 AM and 11:00 PM.',
        timestamp: new Date().toISOString() 
      };
    }

    const booked = await this.bookingModel.find({
      sessionDate: date,
      status: { $in: ['confirmed', 'pending'] },
    }).select('startTime');

    const bookedTimes = new Set(booked.map(b => b.startTime));
    const available = STANDARD_SLOTS.filter(t => !bookedTimes.has(t)).map(t => ({
      startTime: t,
      endTime: t,
    }));

    return { success: true, data: available, timestamp: new Date().toISOString() };
  }

  @Post()
  @ApiOperation({ summary: 'Create direct free booking and store in MongoDB (Weekends 11am-11pm only)' })
  async createBooking(@Body() dto: ICreateBookingDto): Promise<ApiResponse<any>> {
    // 1. Enforce weekend constraint (Saturday and Sunday only, 11am - 11pm)
    const [y, m, d] = dto.sessionDate.split('-').map(Number);
    const dateObj = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = dateObj.getUTCDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      throw new BadRequestException(
        'Appointments can only be scheduled on weekends (Saturday and Sunday) between 11:00 AM and 11:00 PM.'
      );
    }

    // 2. Prevent duplicate bookings for the same date & time slot
    const existing = await this.bookingModel.findOne({
      sessionDate: dto.sessionDate,
      startTime: dto.startTime,
      status: 'confirmed',
    });
    if (existing) {
      throw new ConflictException('This time slot has already been reserved. Please select another slot.');
    }


    // 2. Direct Confirmed Booking with 0 fee (Free 1-on-1 session)
    const booking = await this.bookingModel.create({
      serviceId: dto.serviceId,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone || '',
      sessionDate: dto.sessionDate,
      startTime: dto.startTime,
      timezone: dto.timezone || 'Asia/Kolkata',
      purpose: dto.purpose,
      deliveryMethod: dto.deliveryMethod || 'google_meet',
      amount: 0,
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/rj-session-direct',
    });

    // 3. Dispatch instant alert to Telegram chat
    this.telegramService.sendBookingNotification({
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      serviceId: booking.serviceId,
      sessionDate: booking.sessionDate,
      startTime: booking.startTime,
      purpose: booking.purpose,
    }).catch(() => {});

    return { 
      success: true, 
      data: booking, 
      message: 'Booking confirmed and scheduled successfully',
      timestamp: new Date().toISOString() 
    };
  }

  @Get('admin/all')
  @ApiOperation({ summary: 'Get all bookings' })
  async getAllAdmin(): Promise<ApiResponse<any>> {
    const data = await this.bookingModel.find().sort({ createdAt: -1 });
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Patch('admin/:id/status')
  @ApiOperation({ summary: 'Update booking status' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<ApiResponse<any>> {
    const data = await this.bookingModel.findByIdAndUpdate(id, { status }, { new: true });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
