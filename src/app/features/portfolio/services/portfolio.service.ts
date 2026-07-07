import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioItem {
  id?: number;
  name: string;
  category: string;
  programs: string;
  projects: number;
  owner: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'https://etmam.store';

  getAllPortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(this.apiUrl);
  }
}
