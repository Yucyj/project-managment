import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { PortfolioService, PortfolioItem, SwaggerApiResponse, RoleDropdownItem, DropdownUser } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule], 
  // 🌟 تصحيح مسار الـ Template ليعود قياسياً بنقطة واحدة فقط لمنع خطأ NG2008
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
  isEditMode = false; 
  isSubmitting = false; 
  currentEditingId: number | null = null; 
  
  ownersList: DropdownUser[] = [];
  sponsorsList: DropdownUser[] = [];
  managersList: DropdownUser[] = [];
  uploadedFiles: string[] = [];
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

  get filteredPortfolios(): PortfolioItem[] {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return this.portfoliosList;
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

  onEditPortfolioClick(item: any): void {
    this.isEditMode = true;
    this.isCreateMode = true; 
    this.currentEditingId = item.id;

    this.portfolioForm.patchValue({
      id: item.id,
      name: item.name,
      budget: item.budget,
      description: item.description,
      ownerId: item.ownerId || '',
      sponsorId: item.sponsorId || '',
      managerId: item.managerId || ''
    });
    this.uploadedFiles = item.attachments || [];
    this.cdr.detectChanges();
  }

  // 🌟 معالجة صارمة لقبول الرقم وحذف احتمالية الـ undefined تماماً لحل خطأ TS2345 قاطعاً
  onInlineDeleteClick(portfolioId: number | undefined): void {
    if (portfolioId === undefined) {
      alert('Error: Portfolio ID is missing.');
      return;
    }

    const confirmation = confirm('Are you sure you want to delete this portfolio permanently from table row?');
    if (!confirmation) return;

    this.portfolioService.deletePortfolio(portfolioId).subscribe({
      next: (res: SwaggerApiResponse) => {
        if (res && res.succeeded) {
          alert('Portfolio removed successfully! 🗑️');
          this.fetchLivePortfolios(); 
        } else {
          alert('Failed to delete: ' + res.message);
        }
      },
      error: (err: any) => console.error('Inline erasure failure:', err)
    });
  }

  openCreateForm(): void {
    this.portfolioForm.reset();
    this.portfolioForm.patchValue({ id: 0, budget: 0, ownerId: '', sponsorId: '', managerId: '', attachments: [] });
    this.uploadedFiles = [];
    this.isEditMode = false;
    this.isCreateMode = true;
    this.currentEditingId = null;
    this.cdr.detectChanges();
  }

  closeCreateForm(): void {
    this.portfolioForm.reset();
    this.isCreateMode = false;
    this.isEditMode = false;
    this.currentEditingId = null;
    this.cdr.detectChanges();
  }

  onSavePortfolio(): void {
    if (this.portfolioForm.invalid) {
      alert('Please fill in all required fields properly.');
      return;
    }

    this.isSubmitting = true;
    const formValues = this.portfolioForm.value;

    const finalPayload = {
      id: this.isEditMode ? Number(this.currentEditingId) : 0, 
      name: formValues.name,
      budget: Number(formValues.budget),
      description: formValues.description || "No Description Provided",
      ownerId: formValues.ownerId,
      sponsorId: formValues.sponsorId,
      managerId: formValues.managerId,
      attachments: this.uploadedFiles.length > 0 ? this.uploadedFiles : ["default_portfolio_attachment.pdf"]
    };

    const apiCall = this.isEditMode 
      ? this.portfolioService.updatePortfolio(finalPayload) 
      : this.portfolioService.createPortfolio(finalPayload);

    apiCall.subscribe({
      next: (res) => {
        if (res && res.succeeded) {
          alert(this.isEditMode ? 'Portfolio updated successfully! ✏️' : 'Portfolio created successfully! 🎉');
          this.isCreateMode = false;
          this.isEditMode = false;
          this.fetchLivePortfolios(); 
        } else {
          alert('Server validation note: ' + res.message);
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Database modification logs failure:', err);
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
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
}
