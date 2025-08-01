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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../supabase/supabase.service");
let UserService = class UserService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async registerUser(data) {
        const { data: user, error } = await this.supabase
            .getClient()
            .from('users')
            .insert([data])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return user;
    }
    async getUserByEmail(email) {
        const { data, error } = await this.supabase
            .getClient()
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async updateUser(id, dto) {
        const { data, error } = await this.supabase
            .getClient()
            .from('users')
            .update(dto)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async getUserById(id) {
        const { data, error } = await this.supabase
            .getClient()
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map