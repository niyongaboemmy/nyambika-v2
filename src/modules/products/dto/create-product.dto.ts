import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  size?: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsNotEmpty()
  @IsString()
  seller_id: string; // foreign key

  @IsNotEmpty()
  @IsString()
  category_id: string; // foreign key
}
