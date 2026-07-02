import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 🔗 The exact designated URL confirmed by your instructor
  private apiUrl = 'https://etmam.store/isa/api';

  constructor(private http: HttpClient) {}

  loginToServer(phoneData: string, passwordData: string): Observable<any> {
    // Basic standard credential mapping
    const body = {
      phone: phoneData,
      password: passwordData
    };

    // Explicit standard headers to force clean transmission rules past CORS checks
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.apiUrl, body, httpOptions);
  }
}
