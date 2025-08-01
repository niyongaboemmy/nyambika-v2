import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    const user = await this.userService.getUserById(req.user.userId);
    return {
      message: 'User profile fetched successfully',
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(req.user.userId, dto);
    return {
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  }
}
