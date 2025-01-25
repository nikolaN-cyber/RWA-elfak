import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterUser } from '../../Models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';
  registerUser: RegisterUser = {
    name: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password:"",
    imagePath: ""
  }

  constructor(private userService: UserService, private router: Router) { }

  async register() {
    try {
      await this.userService.RegisterUser(this.registerUser);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = "Failed to register!";
    }
  }
}
