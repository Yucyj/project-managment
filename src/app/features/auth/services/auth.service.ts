import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  // 🚀 المطابقة الكاملة للسواجر: استخدام الـ Auth بالكابيتال لحسم الـ 404 نهائياً عبر الـ Proxy
  private readonly apiUrl = '/api/Auth/login';

  loginToServer(phone: string, password: string): Observable<any> {
    const payloadBody = { phone, password };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, payloadBody, httpOptions);
  }
}
