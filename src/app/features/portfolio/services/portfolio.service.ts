import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PortfolioItem {
  id: number;
  name: string;
  budget: number;
  description: string;
  createdDate: string;
  status: string | null;
  projectsCount: number;
  ownerName: string;
  sponsorName: string;
  managerName: string;
  statusProjects: string | null;
  attachments: string[];
}

export interface SwaggerApiResponse {
  succeeded: boolean;
  status: number;
  message: string;
  data: PortfolioItem[]; // 
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
 
  private apiUrl = 'https://etmam.store/Isa/api/portfolio/getAll-protfolios';

  getAllPortfolios(): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(this.apiUrl);
  }
}
