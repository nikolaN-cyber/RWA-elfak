import { UpdateUser, User } from "../Models/user.model";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor() { }

    async UpdateUser(id: number, updateUser: UpdateUser): Promise<User> {
        try {
            const response = await fetch(`${environment.api}/user/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUser),
            });
            if (!response.ok){
                throw new Error("Failed to update user!");
            }
            const updatedUser = await response.json();
            return updatedUser;

        } catch (error) {
            console.log("Failed to update user!");
            throw error;
        }
    }
}