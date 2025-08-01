import { SupabaseService } from '../../supabase/supabase.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
export declare class ProductCategoriesService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    private get client();
    create(dto: CreateProductCategoryDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateProductCategoryDto, userId: string): Promise<any>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
