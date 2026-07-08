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
  
  // 🌟 جعل الرابط الأساسي يشمل اسم الدومين الرئيسي فقط
  private baseUrl = 'https://etmam.store/Isa'; 

  // جلب بيانات الجدول الرئيسي
  getAllPortfolios(): Observable<SwaggerApiResponse> {
    // 🚀 الاحتمالية الأولى: كتابة اسم الحاوية الافتراضية بحروف صغيرة
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/portfolio/getAll-protfolios`);
  }

  // جلب مستخدمي الأدوار الحية من مسار السواجر الحقيقي
  getRolesDropdown(): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/Auth/roles/dropdown`);
  }

  // إرسال وحفظ بيانات النموذج الجديد
  createPortfolio(portfolioData: any): Observable<SwaggerApiResponse> {
    const token = localStorage.getItem('token') || ''; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<SwaggerApiResponse>(
      `${this.baseUrl}/isa/api/portfolio/create-Portfolio`, 
      portfolioData,
      { headers }
    );
  }
}
