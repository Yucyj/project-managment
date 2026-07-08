import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioItem {
  id?: number;
  name: string;
  budget: number;
  description: string;
  createdDate?: string;
  status: string | null;
  projectsCount?: number;
  ownerName: string;
  sponsorName: string;
  managerName: string;
  statusProjects?: string | null;
  attachments?: any[];
}

export interface DropdownUser {
  id: string;
  fullName: string;
}

export interface RoleDropdownItem {
  id: string;
  name: string;
  users: DropdownUser[];
}

export interface SwaggerApiResponse {
  succeeded: boolean;
  status: number;
  message: string;
  data: any; 
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private baseUrl = 'https://etmam.store/Isa'; 

  // جلب البيانات الإجمالية للجدول
  getAllPortfolios(): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/portfolio/getAll-protfolios`);
  }

  // جلب أدوار النظام ومستخدميها
  getRolesDropdown(): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/Auth/roles/dropdown`);
  }

  // معالج الإرسال النهائي المحمي ضد الـ 400
  createPortfolio(portfolioData: any): Observable<SwaggerApiResponse> {
    
    // جلب التوكن الحقيقي (أضف الاسم الذي وجدته في خطوة فحص الـ Application هنا إذا لزم الأمر)
    const token = 
      localStorage.getItem('token') || 
      localStorage.getItem('accessToken') || 
      localStorage.getItem('jwt') || 
      localStorage.getItem('id_token') ||
      ''; 

    // طباعة فحص حالة التوكن في الـ Console لمعرفة ما إذا كان يقرأه أنجولار أم لا
    console.log('--- Auth Token Inspection ---');
    console.log('Token Key Loaded Value:', token ? 'Bearer Token Extracted Successfully ✅' : 'EMPTY / NOT FOUND ❌');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<SwaggerApiResponse>(
      `${this.baseUrl}/api/portfolio/create-Portfolio`, 
      portfolioData,
      { headers }
    );
  }
}
