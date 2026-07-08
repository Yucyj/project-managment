import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService, PortfolioDetailsData, SwaggerApiResponse } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);
  private cdr = inject(ChangeDetectorRef);

  portfolioId!: number;
  detailsData: any = null; // تحويله إلى any لإلغاء أي تعارض صارم في الواجهة الرسومية فوراً
  isLoading = true;

  ngOnInit(): void {
    this.portfolioId = Number(this.route.snapshot.paramMap.get('id')) || 1; 
    this.loadLiveDetails();
  }

  loadLiveDetails(): void {
    this.isLoading = true;
    this.portfolioService.getPortfolioDetails(this.portfolioId).subscribe({
      next: (response: SwaggerApiResponse) => { 
        if (response && response.succeeded && response.data) {
          this.detailsData = response.data;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => { 
        console.error('API Details Connection Failure:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Approved';
      case 2: return 'Refusing';
      default: return 'Pending';
    }
  }
}
