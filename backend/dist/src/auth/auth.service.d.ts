import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<Omit<UserDocument, 'password'> | null>;
    login(user: {
        username: string;
        _id: any;
        role: string;
    }): Promise<{
        access_token: string;
        userId: any;
        username: string;
        role: string;
    }>;
    register(username: string, password: string, role?: 'user' | 'admin'): Promise<{
        access_token: string;
        userId: any;
        username: string;
        role: string;
    }>;
}
