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
    this.loadPortfoliosData();
  }

  loadPortfoliosData(): void {
    this.isLoading = true;
    this.portfolioService.getAllPortfolios().subscribe({
      next: (data) => {
        this.portfoliosList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Fallback Active:', err);
        // داتا تجريبية ليظل الجدول متوهجاً لحين تفعيل الربط بكره مع المشرف
        this.portfoliosList = [
          { name: 'Saudi Vision Portfolio', category: 'Strategic', programs: 'NTP', projects: 12, owner: 'PMO Lead', status: 'On Track' },
          { name: 'Digital Transformation', category: 'Tech Infrastructure', programs: 'EGov', projects: 8, owner: 'Abdulaziz Mo', status: 'Pending' }
        ];
        this.isLoading = false;
      }
    });
  }
}
