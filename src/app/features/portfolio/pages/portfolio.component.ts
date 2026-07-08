import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PortfolioItem, SwaggerApiResponse } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private cdr = inject(ChangeDetectorRef);
  
  portfoliosList: PortfolioItem[] = [];
  isLoading = true;
  
  // 🌟 علم شرطي للتحكم في عرض النموذج أو الجدول
  isCreateMode = false; 

  ngOnInit(): void {
    this.fetchLivePortfolios();
  }

  fetchLivePortfolios(): void {
    this.isLoading = true;
    this.portfolioService.getAllPortfolios().subscribe({
      next: (response: SwaggerApiResponse) => {
        if (response && response.succeeded) {
          const liveData = response.data || (response as any).Data;
          if (liveData && Array.isArray(liveData)) {
            this.portfoliosList = liveData;
          }
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('API Pipeline Connection Failure:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // 🌟 دالة لتفعيل وضع إنشاء نموذج جديد
  openCreateForm(): void {
    this.isCreateMode = true;
    this.cdr.detectChanges();
  }

  // 🌟 دالة للعودة إلى وضع استعراض الجدول
  closeCreateForm(): void {
    this.isCreateMode = false;
    this.cdr.detectChanges();
  }
}
