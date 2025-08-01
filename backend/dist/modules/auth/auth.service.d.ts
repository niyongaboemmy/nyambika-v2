import { SupabaseService } from '../../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthService {
    private supabase;
    private jwtService;
    constructor(supabase: SupabaseService, jwtService: JwtService);
    registerUser(dto: CreateUserDto): Promise<any>;
    loginUser(dto: LoginUserDto): Promise<{
        access_token: string;
        user: any;
    }>;
}
