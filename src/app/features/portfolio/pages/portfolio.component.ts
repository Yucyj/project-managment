import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PortfolioItem } from '../services/portfolio.service';

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
      next: (response) => {
        // 🚀 فك التغليف السليم: سحب المصفوفة الحية مباشرة من حقل data الراجع من السيرفر
        if (response && response.succeeded && response.data) {
          this.portfoliosList = response.data;
        }
        this.isLoading = false;
        console.log('Figma Connected to Swagger DB Successfully:', this.portfoliosList);
      },
      error: (err) => {
        console.error('API Error Connection Level:', err);
        this.isLoading = false;
      }
    });
  }
}
