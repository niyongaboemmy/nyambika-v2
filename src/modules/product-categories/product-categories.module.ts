import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService, SupabaseService],
})
export class ProductCategoriesModule {}
