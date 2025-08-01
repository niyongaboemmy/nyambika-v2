import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<{
        message: string;
        user: any;
    }>;
    login(dto: LoginUserDto): Promise<{
        access_token: string;
        user: any;
        message: string;
    }>;
}
