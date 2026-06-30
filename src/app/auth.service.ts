import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://etmam.store/Isa/api/Auth/login';

  constructor(private http: HttpClient) {}

  loginToServer(phoneData: string, passwordData: string): Observable<any> {
    const body = {
      phone: phoneData,
      password: passwordData
    };
    return this.http.post(this.apiUrl, body);
  }
}
git add .
git commit -m "API data stream integration"
git push origin main