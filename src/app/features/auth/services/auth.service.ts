import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // الرابط الصريح والمباشر المعتمد من السواجر لتشغيل النظام فوراً
  private apiUrl = 'https://etmam.store';

  constructor(private http: HttpClient) {}

  loginToServer(phoneData: string, passwordData: string): Observable<any> {
    const body = {
      phone: phoneData,
      password: passwordData
    };
    return this.http.post(this.apiUrl, body);
  }
}
