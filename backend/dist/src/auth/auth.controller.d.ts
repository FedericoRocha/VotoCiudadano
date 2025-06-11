import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        userId: any;
        username: string;
        role: string;
    }>;
    getProfile(req: any): any;
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        access_token: string;
        userId: any;
        username: string;
        role: string;
    }>;
}
