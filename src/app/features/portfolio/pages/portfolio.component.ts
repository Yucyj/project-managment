import { Component, OnInit, inject } from '@angular/core';
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
  
  portfoliosList: PortfolioItem[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.fetchLivePortfolios();
  }

  fetchLivePortfolios(): void {
    this.isLoading = true;
    this.portfolioService.getAllPortfolios().subscribe({
      next: (response: SwaggerApiResponse) => {
        console.log('Raw Response from Server captured:', response);
        
        if (response && response.succeeded) {
          // 🚀 كسر عناد حالة الأحرف: فحص وتأمين قراءة المصفوفة الحية سواء رجعت 'data' سمول أو 'Data' كابيتال
          const liveData = response.data || (response as any).Data;
          
          if (liveData && Array.isArray(liveData)) {
            this.portfoliosList = liveData;
          }
        }
        this.isLoading = false;
        console.log('Successfully connected and populated table array:', this.portfoliosList);
      },
      error: (err: any) => {
        console.error('API Pipeline Connection Failure:', err);
        this.isLoading = false;
      }
    });
  }
}
