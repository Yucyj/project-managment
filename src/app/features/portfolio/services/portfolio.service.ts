import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🚀 مطابقة أسماء حقول الداتابيز الفردية الراجعة من الـ Swagger بالملي
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

// 🚀 الـ Interface للحاوية الرئيسية التي ترجعها الـ API
export interface SwaggerApiResponse {
  succeeded: boolean;
  status: string;
  message: string;
  data: PortfolioItem[]; // المصفوفة الحية بداخل حقل data
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'https://etmam.store/Isa/api/portfolio/getAll-protfolios';

  // دالة الاستهلاك الصافية المربوطة بالـ GET ريكويست
  getAllPortfolios(): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(this.apiUrl);
  }
}
