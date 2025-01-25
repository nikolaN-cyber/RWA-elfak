import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./DTOs/userDTO";
import { User } from "./Entities/user.entity";
import { UserUpdateDTO } from "./DTOs/userUpdateDto";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('user')
export class UserController{
    constructor (private readonly userService : UserService) {}

    @Post('register')
    async registerUser(@Body() user : UserDTO) : Promise<User> {
        return this.userService.CreateUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateUser(@Param('id') id: number,@Body() userUpdate: UserUpdateDTO){
        return this.userService.UpdateUser(id, userUpdate);
    }
}