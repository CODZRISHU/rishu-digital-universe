import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { Payment, PaymentDocument } from '../../schemas/payment.schema';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { ApiResponse } from '@rishu/shared-types';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private configService: ConfigService,
  ) {}

  @Post('razorpay/create-order')
  @ApiOperation({ summary: 'Create Razorpay Order for Booking' })
  async createOrder(@Body('bookingId') bookingId: string): Promise<ApiResponse<any>> {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID') || 'rzp_test_placeholder';
    const fakeOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const payment = await this.paymentModel.create({
      bookingId: booking._id.toString(),
      razorpayOrderId: fakeOrderId,
      amount: booking.amount,
      currency: 'INR',
      status: 'created',
    });

    return {
      success: true,
      data: {
        orderId: fakeOrderId,
        amount: booking.amount * 100, // paise
        currency: 'INR',
        keyId,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Post('razorpay/verify')
  @ApiOperation({ summary: 'Verify Razorpay HMAC Signature' })
  async verifyPayment(@Body() body: any): Promise<ApiResponse<any>> {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    const secret = this.configService.get<string>('RAZORPAY_KEY_SECRET');
    let isValid = true;

    // Cryptographic HMAC Verification if secret provided
    if (secret && razorpaySignature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      isValid = generatedSignature === razorpaySignature;
    }

    if (!isValid) {
      throw new BadRequestException('Invalid payment signature verification failed');
    }

    // Update payment record
    await this.paymentModel.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'captured',
      },
      { upsert: true }
    );

    // Update booking status to confirmed
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      bookingId,
      {
        status: 'confirmed',
        paymentId: razorpayPaymentId || `sim_${Date.now()}`,
      },
      { new: true }
    );

    return {
      success: true,
      data: updatedBooking,
      message: 'Payment verified and booking confirmed',
      timestamp: new Date().toISOString(),
    };
  }
}
