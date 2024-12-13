import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../Models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const userFromCookie = this.getUserFromCookie();
    this.userSubject = new BehaviorSubject<User | null>(userFromCookie);
    this.user = this.userSubject.asObservable();
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${environment.api}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const user = await response.json();
      this.userSubject.next(user.user);
      this.setUserInCookie(user.user);
      return user.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  private setUserInCookie(user: User) {
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`;
  }

  private getUserFromCookie(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
      if (cookie) {
        const userData = cookie.split('=')[1];
        try {
          const decodedData = decodeURIComponent(userData);
          return JSON.parse(decodedData);
        } catch (error) {
          console.error('Error parsing user cookie:', error);
        }
      }
    }
    return null;
  }

  getCurrentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
