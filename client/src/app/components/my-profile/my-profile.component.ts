import { Component, OnInit } from '@angular/core';
import { UpdateUser, User } from '../../Models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  user: User | null = null;
  userUpdate: UpdateUser = {
    name: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    imagePath: ''
  };

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userUpdate = {
          name: this.user.name || '',
          lastName: this.user.lastName || '',
          address: this.user.address || '',
          phoneNumber: this.user.phoneNumber || '',
          imagePath: this.user.imagePath || ''
        };
      }
    });
  }


  async updateUser() {
    if (this.user) {
      try {
        const updatedUser = await this.userService.UpdateUser(this.user.id!, this.userUpdate);
        this.user = updatedUser;
        console.log('User updated successfully', updatedUser);
      } catch (error) {
        console.error('Error updating user', error);
      }
    }
  }

}
