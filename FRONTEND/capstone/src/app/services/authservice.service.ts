import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { Customers } from '../Model/customers';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private allUsers = new Map<string, User>();
  constructor() { }
  SignuptheUser(user: User): boolean {
    if (!this.allUsers.has(user.username)) {
      this.allUsers.set(user.username, user);
      // Generate a token using username and password
      const token = btoa(`${user.username}:${user.userpassword}`);
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

   loginTheUser(username: string, password: string): boolean {
    const user = this.allUsers.get(username);
    if (user && user.userpassword === password) {
      // Generate a token using username and password
      const token = btoa(`${username}:${password}`);
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }
  isTokenStored(): boolean {
    return !!localStorage.getItem('token');
  }

  tokenDelete(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
}
