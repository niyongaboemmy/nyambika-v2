import { SupabaseService } from '../../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private supabase;
    constructor(supabase: SupabaseService);
    registerUser(data: CreateUserDto): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    updateUser(id: string, dto: UpdateUserDto): Promise<any>;
    getUserById(id: string): Promise<any>;
}
