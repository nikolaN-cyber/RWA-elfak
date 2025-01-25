import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/Entities/user.entity';
import { JWT_EXPIRATION, JWT_SECRET } from 'helper-config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && (await this.userService.comparePasswords(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        const { password, ...safeUser } = user;
        return {
            user: safeUser,
            access_token: this.jwtService.sign(payload, {secret:  JWT_SECRET.secret, expiresIn: JWT_EXPIRATION.time}),
        };
    }
}