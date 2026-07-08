import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PortfolioService, PortfolioItem, SwaggerApiResponse, RoleDropdownItem, DropdownUser } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  // 🌟 أضفنا الـ FormsModule هنا لتفعيل ميزة التصفية الحية الثنائية الربط
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
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
  
  ownersList: DropdownUser[] = [];
  sponsorsList: DropdownUser[] = [];
  managersList: DropdownUser[] = [];
  uploadedFiles: string[] = [];

  // 🌟 متغير البحث الحي لالتقاط كلمات المستخدم أثناء الكتابة
  searchQuery: string = '';

  portfolioForm!: FormGroup;

  ngOnInit(): void {
    this.fetchLivePortfolios();
    this.loadDropdownData();
    this.initPortfolioForm();
  }

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

  // 🚀 دالة تصفية مصفوفة البيانات حياً بناءً على مدخلات حقل البحث
  get filteredPortfolios(): PortfolioItem[] {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return this.portfoliosList; // إذا كان الحقل فارغاً، يعرض كافة المحافظ
    }
    
    const query = this.searchQuery.toLowerCase().trim();
    
    return this.portfoliosList.filter(item => {
      return (
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.managerName && item.managerName.toLowerCase().includes(query))
      );
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

  loadDropdownData(): void {
    this.portfolioService.getRolesDropdown().subscribe({
      next: (response: SwaggerApiResponse) => {
        if (response && response.succeeded && Array.isArray(response.data)) {
          const roles: RoleDropdownItem[] = response.data;
          const managerRole = roles.find(r => r.name === 'Manager');
          if (managerRole) this.managersList = managerRole.users;
          const sponsorRole = roles.find(r => r.name === 'Sponser');
          if (sponsorRole) this.sponsorsList = sponsorRole.users;
          const ownerRole = roles.find(r => r.name === 'Owner');
          if (ownerRole) this.ownersList = ownerRole.users;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load dynamic dropdown assets:', err)
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i].name);
      }
      this.cdr.detectChanges();
    }
  }

  openCreateForm(): void {
    this.portfolioForm.reset({ id: 0, budget: 0, ownerId: '', sponsorId: '', managerId: '', attachments: [] });
    this.uploadedFiles = [];
    this.isCreateMode = true;
    this.cdr.detectChanges();
  }

  closeCreateForm(): void {
    this.isCreateMode = false;
    this.cdr.detectChanges();
  }

  onSavePortfolio(): void {
    if (this.portfolioForm.invalid) {
      alert('Please fill in all required fields properly.');
      return;
    }
    if (this.uploadedFiles.length === 0) {
      this.uploadedFiles.push("default_portfolio_attachment.pdf");
    }
    this.isSubmitting = true;
    const formValues = this.portfolioForm.value;
    const finalPayload = {
      id: 0,
      name: formValues.name,
      budget: Number(formValues.budget),
      description: formValues.description || "No Description Provided",
      ownerId: formValues.ownerId,
      sponsorId: formValues.sponsorId,
      managerId: formValues.managerId,
      attachments: this.uploadedFiles
    };

    this.portfolioService.createPortfolio(finalPayload).subscribe({
      next: (res) => {
        if (res && res.succeeded) {
          alert('Portfolio created successfully! 🎉');
          this.isCreateMode = false;
          this.fetchLivePortfolios(); 
        } else {
          alert('Server validation note: ' + (res.message || 'Check database restrictions.'));
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Database rejection logs:', err);
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}
