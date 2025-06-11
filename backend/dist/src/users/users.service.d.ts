import { Model } from 'mongoose';
import { UserDocument } from './user.entity';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(username: string): Promise<UserDocument | null>;
    create(username: string, password: string, role?: 'user' | 'admin'): Promise<UserDocument>;
}
