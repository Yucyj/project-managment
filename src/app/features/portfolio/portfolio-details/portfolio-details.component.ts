import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PortfolioService, SwaggerApiResponse } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], 
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  private portfolioService = inject(PortfolioService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  portfolioId!: number;
  detailsData: any = null;
  isLoading = true;
  
  // 🌟 علم وضع التعديل البرمجي المؤقت والتحكم بالحركة
  isEditMode = false;
  isSubmitting = false;
  updateForm!: FormGroup;

  // قوائم حية احتياطية للمستخدمين عند رغبة التعديل بالاختيار
  ownersList: any[] = [];
  sponsorsList: any[] = [];
  managersList: any[] = [];

  ngOnInit(): void {
    this.portfolioId = Number(this.route.snapshot.paramMap.get('id')) || 1; 
    this.loadLiveDetails();
    this.initUpdateForm();
    this.loadDropdownData();
  }

  initUpdateForm(): void {
    this.updateForm = this.fb.group({
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

  loadDropdownData(): void {
    this.portfolioService.getRolesDropdown().subscribe({
      next: (response: SwaggerApiResponse) => {
        if (response && response.succeeded && Array.isArray(response.data)) {
          response.data.forEach((role: any) => {
            if (role.name === 'Manager') this.managersList = role.users;
            if (role.name === 'Sponser') this.sponsorsList = role.users;
            if (role.name === 'Owner') this.ownersList = role.users;
          });
        }
        this.cdr.detectChanges();
      }
    });
  }

  // 🚀 دالة تفعيل وضع التعديل وضخ قيم الباكيند الحالية بداخل خانات الفورم تلقائياً
  onEditToggle(): void {
    if (!this.detailsData || !this.detailsData.portfolio) return;
    
    const p = this.detailsData.portfolio;
    this.updateForm.patchValue({
      id: p.id,
      name: p.name,
      budget: p.budget,
      description: p.description || '',
      ownerId: p.ownerId || '',
      sponsorId: p.sponsorId || '',
      managerId: p.managerId || '',
      attachments: p.attachments || []
    });
    
    this.isEditMode = true;
    this.cdr.detectChanges();
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.cdr.detectChanges();
  }

  // 🚀 معالج نداء الـ PUT للحفظ والتعديل الفعلي في قاعدة البيانات الحية
  onSaveUpdate(): void {
    if (this.updateForm.invalid) {
      alert('Please fill in all required fields properly.');
      return;
    }

    this.isSubmitting = true;
    const formValues = this.updateForm.value;

    // بناء الـ JSON Payload المتوافق مع الـ Request Body ببدء حقول بحروف صغيرة بالملي
    const finalPayload = {
      id: Number(formValues.id),
      name: formValues.name,
      budget: Number(formValues.budget),
      description: formValues.description || "",
      ownerId: formValues.ownerId,
      sponsorId: formValues.sponsorId,
      managerId: formValues.managerId,
      attachments: formValues.attachments && formValues.attachments.length > 0 ? formValues.attachments : ["default.pdf"]
    };

    this.portfolioService.updatePortfolio(finalPayload).subscribe({
      next: (res: SwaggerApiResponse) => {
        if (res && res.succeeded) {
          alert('Portfolio updated successfully! 🎉');
          this.isEditMode = false;
          this.loadLiveDetails(); // 🔄 إعادة سحب التفاصيل حياً لرؤية المسميات والميزانية الجديدة فوراً بالصفحة
        } else {
          alert('Server validation note: ' + res.message);
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Update Request failed details:', err);
        alert('Failed to execute update request. Verify payload format constraints.');
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  onDeletePortfolio(): void {
    const confirmation = confirm('Are you sure you want to delete this portfolio permanently?');
    if (!confirmation) return;

    this.portfolioService.deletePortfolio(this.portfolioId).subscribe({
      next: (res: SwaggerApiResponse) => {
        if (res && res.succeeded) {
          alert('Portfolio deleted successfully! 🗑️');
          this.router.navigate(['/portfolio']); 
        }
      }
    });
  }
}
