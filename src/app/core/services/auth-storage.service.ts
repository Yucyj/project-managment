import { Injectable } from '@angular/core';
import { LoginResponse } from '../../features/auth/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly userKey = 'auth_user';

  saveAuthData(data: LoginResponse): void {
    localStorage.setItem(this.accessTokenKey, data.accessToken);
    localStorage.setItem(this.refreshTokenKey, data.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify({
      userId: data.userId,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      role: data.role
    }));
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clear(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }
}