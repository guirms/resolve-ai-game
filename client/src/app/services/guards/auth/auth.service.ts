import { Injectable } from '@angular/core';
import { AuthToken } from '../../../../assets/constants/storage-key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(AuthToken);
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = payload.exp * 1000;
    return expirationDate < Date.now();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      localStorage.clear();
      return false;
    }

    return !this.isTokenExpired(token);
  }
}
