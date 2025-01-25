import { Component, OnInit } from '@angular/core';
import { UpdateUser, User } from '../../Models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
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


  updateUser() {
    if (this.user) {
      const confirmUpdate = window.confirm('Are you sure you want to update your profile?');
      if (!confirmUpdate) {
        return;
      }
      this.authService.getCurrentUser()
        .pipe(
          switchMap(user => {
            if (!user) {
              return of(null);
            }
            return this.userService.UpdateUser(user.id!, this.userUpdate);
          })
        )
        .subscribe({
          next: updatedUser => {
            if (updatedUser) {
              this.user = updatedUser;
              console.log('User updated successfully', updatedUser);
            }
          },
          error: error => {
            console.error('Error updating user', error);
          }
        });
    }
  }

}
