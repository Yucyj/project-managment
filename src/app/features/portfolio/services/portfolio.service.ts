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

// 🚀 Interfaces الجديدة لمطابقة تفاصيل المحفظة والـ JSON الفعلي بالملي
export interface ProgramItem {
  id: number;
  name: string;
  projectsCount: number;
  tasksCount: number;
  projectOwner: string[];
  statusProject: number;
}

export interface PortfolioDetailInfo {
  id: number;
  budget: number;
  name: string;
  createdDate: string;
  ownerName: string;
  managerName: string;
  sponsorName: string;
  creationDate: string;
}

export interface PortfolioDetailsData {
  programs: ProgramItem[];
  portfolio: PortfolioDetailInfo;
  items: { pageSize: number; pageNumbers: number };
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

  // 🔄 دالة حية لجلب تفاصيل المحفظة والمشاريع التابعة لها بالاعتماد على الـ id والـ Pagination
  getPortfolioDetails(id: number, pageNom: number = 1, pageSize: number = 10): Observable<SwaggerApiResponse> {
    return this.http.get<SwaggerApiResponse>(`${this.baseUrl}/api/portfolio/details?id=${id}&pageSize=${pageSize}&pageNom=${pageNom}`);
  }

  // 🚀 دالة الحذف الجديدة لتمرير معرف المحفظة والتوكن المعتمد سوياً بداخل الترويسة بالملي
  deletePortfolio(portfolioId: number): Observable<SwaggerApiResponse> {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || ''; 
    
    const headers = new HttpHeaders({
      'accept': '*/*',
      'id': portfolioId.toString(), // السيرفر يقرأه كنص من الـ Header
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<SwaggerApiResponse>(
      `${this.baseUrl}/api/portfolio/Delete-protfolio`, 
      { headers }
    );
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
  updatePortfolio(portfolioData: any): Observable<SwaggerApiResponse> {
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || ''; 
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*',
    'Authorization': `Bearer ${token}`
  });

  // 🚀 استهلاك مسار الـ PUT القياسي المتوافق مع السواجر الفعلي بالملي
  return this.http.put<SwaggerApiResponse>(
    `${this.baseUrl}/api/portfolio/Update-protfolio`, 
    portfolioData,
    { headers }
  );
}
}