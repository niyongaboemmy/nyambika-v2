import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private supabase: SupabaseService) {}

  async registerUser(data: CreateUserDto) {
    const { data: user, error } = await this.supabase
      .getClient()
      .from('users')
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return user;
  }

  async getUserByEmail(email: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getUserById(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
