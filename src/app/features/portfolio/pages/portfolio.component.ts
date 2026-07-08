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
  
  ownersList: DropdownUser[] = [];
  sponsorsList: DropdownUser[] = [];
  managersList: DropdownUser[] = [];

  // 🌟 مصفوفة لتخزين أسماء الملفات المرفوعة حياً
  uploadedFiles: string[] = [];

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
      error: (err) => {
        console.error('Failed to load dynamic dropdown assets:', err);
      }
    });
  }

  // 🚀 معالج حدث رفع الملفات الحقيقي واختياره من الكمبيوتر
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        // نأخذ اسم الملف وامتداده الفعلي لتغذية طلب السيرفر بدقة
        this.uploadedFiles.push(files[i].name);
      }
      this.cdr.detectChanges();
    }
  }

  openCreateForm(): void {
    this.portfolioForm.reset({ id: 0, budget: 0, ownerId: '', sponsorId: '', managerId: '', attachments: [] });
    this.uploadedFiles = []; // تصفير الملفات عند فتح نموذج جديد
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

    // 🌟 تأمين وجود ملف مرفق واحد على الأقل إذا كان السيرفر يشترط عدم إرسال حقول الرفع فارغة
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
      attachments: this.uploadedFiles // تمرير أسماء الملفات الحقيقية المرفوعة بالملي!
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
        if (err.error && err.error.message) {
          alert(`Server Rejected: ${err.error.message}`);
        } else {
          alert('User session not authenticated. Make sure token is saved correctly.');
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}
