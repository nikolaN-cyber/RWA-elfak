import { Injectable, BadRequestException, NotFoundException,} from '@nestjs/common';
import { UserDTO } from './DTOs/userDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserUpdateDTO } from './DTOs/userUpdateDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async CreateUser(user : UserDTO) : Promise<User> {
        const {email, password} = user;

        const existingUser = await this.userRepository.findOneBy({email});
        if (existingUser){
            throw new BadRequestException("User with same email address already exists!");
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User();
        newUser.name = user.name;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = hashedPassword;
        newUser.address = user.address; 
        newUser.imagePath = user.imagePath;
        return await this.userRepository.save(newUser);
    }

    async UpdateUser(id: number, updateUser: UserUpdateDTO){
        const user = await this.userRepository.findOneBy({id});
        if (!user){
            throw new NotFoundException("User doesnt exist!");
        }
        Object.assign(user, updateUser);
        return await this.userRepository.save(user);
    }

    async findByEmail(email : string) : Promise<User | undefined> {
        return this.userRepository.findOneBy({email});
    }

    async comparePasswords(password : string, hashedPassword : string) : Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}

