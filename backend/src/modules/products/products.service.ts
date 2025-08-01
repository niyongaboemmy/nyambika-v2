// ...other imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client(): SupabaseClient {
    return this.supabaseService.getClient();
  }

  async create(dto: CreateProductDto) {
    const { data, error } = await this.client
      .from('products')
      .insert(dto)
      .select()
      .single();

    if (error) {
      throw new HttpException(
        `Create failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.client.from('products').select('*');
    if (error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return data;
  }

  async update(id: string, dto: UpdateProductDto, userId: string) {
    const existing = await this.findOne(id);
    if (existing.seller_id !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    const { data, error } = await this.client
      .from('products')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    return data;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id);
    if (existing.seller_id !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    const { error } = await this.client.from('products').delete().eq('id', id);
    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    return { message: 'Deleted successfully' };
  }
}
