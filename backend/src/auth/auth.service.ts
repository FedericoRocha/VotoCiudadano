import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Omit<UserDocument, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result as Omit<UserDocument, 'password'>;
    }
    return null;
  }

  async login(user: { username: string; _id: any; role: string }) {
    const payload = { 
      username: user.username, 
      sub: user._id.toString(), 
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      userId: user._id,
      username: user.username,
      role: user.role
    };
  }

  async register(username: string, password: string, role: 'user' | 'admin' = 'user') {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hash, role);
    return this.login(user);
  }
}
