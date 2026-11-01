import { Controller, Get, Post, Patch, Body, Query, Param, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { Service, ServiceDocument } from '../../schemas/service.schema';
import { TelegramService } from '../telegram/telegram.service';
import { ICreateBookingDto, ApiResponse } from '@rishu/shared-types';

const STANDARD_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:30 PM',
  '04:00 PM',
  '06:30 PM',
  '08:00 PM',
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
  @ApiOperation({ summary: 'Get available time slots for a given date' })
  async getAvailableSlots(@Query('date') date: string): Promise<ApiResponse<any>> {
    if (!date) {
      date = new Date().toISOString().split('T')[0];
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
  @ApiOperation({ summary: 'Create direct free booking and store in MongoDB' })
  async createBooking(@Body() dto: ICreateBookingDto): Promise<ApiResponse<any>> {
    // 1. Prevent duplicate bookings for the same date & time slot
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
