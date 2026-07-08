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
  attachments: any[];
}

export interface SwaggerApiResponse {
  succeeded: boolean;
  status: number;
  message: string;
  data: PortfolioItem[]; 
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
  // 🌟 هنا قمنا بإضافة /isa بدقة بناءً على عنوان السواجر لضمان توجيه الطلب بشكل صحيح
  private baseUrl = 'https://etmam.store/Isa'; 

  getAllPortfolios(): Observable<SwaggerApiResponse> {
    // ندمج الـ baseUrl مع المسار المكتوب في السواجر (لاحظ كلمة getAll-protfolios بإملائها الخاص بالخلفية)
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/portfolio/getAll-protfolios`);
  }
}
