export declare class CreateUserDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'admin' | 'seller' | 'customer';
}
