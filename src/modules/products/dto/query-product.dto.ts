import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
