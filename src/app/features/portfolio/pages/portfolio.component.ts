import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PortfolioService, PortfolioItem, SwaggerApiResponse, RoleDropdownItem, DropdownUser } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder); 
  
  portfoliosList: PortfolioItem[] = [];
  isLoading = true;
  isCreateMode = false;
  isSubmitting = false; 
  
  // مصفوفات حية لتخزين مستخدمي قاعدة البيانات للقوائم المنسدلة الثلاث
  ownersList: DropdownUser[] = [];
  sponsorsList: DropdownUser[] = [];
  managersList: DropdownUser[] = [];

  portfolioForm!: FormGroup;

  ngOnInit(): void {
    this.fetchLivePortfolios();
    this.loadDropdownData();
    this.initPortfolioForm();
  }

  // 🌟 تم تصحيح القيمة البرمجية إلى id: 0 للتخلص تماماً من خطأ TS1109 القاتل
  initPortfolioForm(): void {
    this.portfolioForm = this.fb.group({
      id: 0, 
      name: ['', [Validators.required]],
      budget: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      ownerId: ['', [Validators.required]], 
      sponsorId: ['', [Validators.required]],
      managerId: ['', [Validators.required]],
      attachments: [[]]
    });
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

  // سحب مستخدمي الأدوار بشكل ديناميكي وتوزيعهم حسب شاشات السواجر
  loadDropdownData(): void {
    this.portfolioService.getRolesDropdown().subscribe({
      next: (response: SwaggerApiResponse) => {
        if (response && response.succeeded && Array.isArray(response.data)) {
          const roles: RoleDropdownItem[] = response.data;
          
          // فرز مدير المحفظة
          const managerRole = roles.find(r => r.name === 'Manager');
          if (managerRole) this.managersList = managerRole.users;

          // فرز الكفيل الإداري
          const sponsorRole = roles.find(r => r.name === 'Sponser');
          if (sponsorRole) this.sponsorsList = sponsorRole.users;

          // مطابقة دور الـ Owner القادم من الـ JSON بدقة متناهية لتعبئة أسماء (بدر فهد وفيصل العتيبي)
          const ownerRole = roles.find(r => r.name === 'Owner');
          if (ownerRole) this.ownersList = ownerRole.users;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load dynamic dropdown assets:', err);
      }
    });
  }

  openCreateForm(): void {
    this.portfolioForm.reset({ id: 0, budget: 0, ownerId: '', sponsorId: '', managerId: '', attachments: [] });
    this.isCreateMode = true;
    this.cdr.detectChanges();
  }

  closeCreateForm(): void {
    this.isCreateMode = false;
    this.cdr.detectChanges();
  }

  onSavePortfolio(): void {
    if (this.portfolioForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;
    const payload = this.portfolioForm.value;

    this.portfolioService.createPortfolio(payload).subscribe({
      next: (res) => {
        if (res && res.succeeded) {
          alert('Portfolio created successfully! 🎉');
          this.isCreateMode = false;
          this.fetchLivePortfolios(); 
        } else {
          alert('Server Message: ' + res.message);
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Database insertion error details:', err);
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}
