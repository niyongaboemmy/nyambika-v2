import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class QueryProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
