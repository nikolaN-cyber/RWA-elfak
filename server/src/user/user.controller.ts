import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./DTOs/userDTO";
import { User } from "./Entities/user.entity";

@Controller('user')
export class UserController{
    constructor (private readonly userService : UserService) {}

    @Post('register')
    async registerUser(@Body() user : UserDTO) : Promise<User> {
        return this.userService.CreateUser(user);
    }
}