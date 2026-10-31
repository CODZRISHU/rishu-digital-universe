import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { Service, ServiceDocument } from '../../schemas/service.schema';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
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
  @ApiOperation({ summary: 'Create pending booking with concurrency lock' })
  async createBooking(@Body() dto: ICreateBookingDto): Promise<ApiResponse<any>> {
    // 1. Concurrency Check: Prevent double-booking
    const existing = await this.bookingModel.findOne({
      sessionDate: dto.sessionDate,
      startTime: dto.startTime,
      status: 'confirmed',
    });
    if (existing) {
      throw new ConflictException('This time slot has already been reserved. Please choose another slot.');
    }

    // 2. Resolve amount
    let fee = 999;
    const srv = await this.serviceModel.findOne({ slug: dto.serviceId });
    if (srv) {
      fee = srv.price;
    }

    const booking = await this.bookingModel.create({
      serviceId: dto.serviceId,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone,
      sessionDate: dto.sessionDate,
      startTime: dto.startTime,
      timezone: dto.timezone || 'Asia/Kolkata',
      purpose: dto.purpose,
      deliveryMethod: dto.deliveryMethod || 'google_meet',
      amount: fee,
      status: 'pending',
    });

    return { success: true, data: booking, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/all')
  @ApiOperation({ summary: 'Get all bookings (Admin only)' })
  async getAllAdmin(): Promise<ApiResponse<any>> {
    const data = await this.bookingModel.find().sort({ createdAt: -1 });
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id/status')
  @ApiOperation({ summary: 'Update booking status (Admin only)' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<ApiResponse<any>> {
    const data = await this.bookingModel.findByIdAndUpdate(id, { status }, { new: true });
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
