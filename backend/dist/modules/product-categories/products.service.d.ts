import { SupabaseService } from '../../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product-category.dto';
import { UpdateProductDto } from './dto/update-product-category.dto';
export declare class ProductsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    private get client();
    create(dto: CreateProductDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateProductDto, userId: string): Promise<any>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
