import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        message: string;
        user: any;
    }>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        message: string;
        user: any;
    }>;
}
