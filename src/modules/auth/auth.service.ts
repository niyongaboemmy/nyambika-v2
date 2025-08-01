import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    // Optionally add password validation here
    if (!dto.password || dto.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const { data: existingUser, error: fetchError } = await this.supabase
      .getClient()
      .from('users')
      .select('id')
      .eq('email', dto.email)
      .single();

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .insert([{ ...dto, password: hashedPassword }])
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async loginUser(dto: LoginUserDto) {
    const { data: user, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*')
      .eq('email', dto.email)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}
