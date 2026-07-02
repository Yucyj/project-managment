import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://etmam.store/isa/api';

  constructor(private http: HttpClient) {}

  loginToServer(phoneData: string, passwordData: string): Observable<any> {
    const body = {
      phone: phoneData,
      password: passwordData
    };
    return this.http.post(this.apiUrl, body);
  }
}
