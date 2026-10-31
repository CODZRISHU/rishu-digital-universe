import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { ILoginDto, ApiResponse } from '@rishu/shared-types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin / User Login' })
  async login(@Body() loginDto: ILoginDto): Promise<ApiResponse<any>> {
    const data = await this.authService.login(loginDto);
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate Refresh Token' })
  async refresh(@Body('refreshToken') token: string): Promise<ApiResponse<any>> {
    const data = await this.authService.refreshToken(token);
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke User Session' })
  async logout(@Request() req: any): Promise<ApiResponse<any>> {
    await this.authService.logout(req.user._id);
    return {
      success: true,
      message: 'Logged out successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  async getProfile(@Request() req: any): Promise<ApiResponse<any>> {
    return {
      success: true,
      data: req.user,
      timestamp: new Date().toISOString(),
    };
  }
}
