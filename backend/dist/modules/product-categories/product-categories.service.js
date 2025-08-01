"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../supabase/supabase.service");
let ProductCategoriesService = class ProductCategoriesService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    get client() {
        return this.supabaseService.getClient();
    }
    async create(dto) {
        const { data, error } = await this.client
            .from('product_categories')
            .insert(dto)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Create failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.client
            .from('product_categories')
            .select('*');
        if (error)
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.client
            .from('product_categories')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        return data;
    }
    async update(id, dto, userId) {
        const existing = await this.findOne(id);
        if (existing.seller_id !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        const { data, error } = await this.client
            .from('product_categories')
            .update(dto)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        return data;
    }
    async remove(id, userId) {
        const existing = await this.findOne(id);
        if (existing.seller_id !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        const { error } = await this.client
            .from('product_categories')
            .delete()
            .eq('id', id);
        if (error)
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        return { message: 'Deleted successfully' };
    }
};
exports.ProductCategoriesService = ProductCategoriesService;
exports.ProductCategoriesService = ProductCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ProductCategoriesService);
//# sourceMappingURL=product-categories.service.js.map