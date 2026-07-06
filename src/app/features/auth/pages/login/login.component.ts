import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  showPassword = false;
  feedbackMessage = '';
  isSuccess = false;
  
  isArabic = true;
  mobileNumber = '';
  password = '';
  currentSlide = 0;

  slides = [
    { title: 'Control Every Project From One Place', desc: 'Track performance, assign responsibilities, and keep every workflow aligned efficiently.' },
    { title: 'Predictive Analytical Integrity', desc: 'Monitor resource anomalies and secure corporate task parameters instantly.' }
  ];

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  toggleLanguage() { this.isArabic = !this.isArabic; }
  setSlide(index: number) { this.currentSlide = index; }
  togglePassword(): void { this.showPassword = !this.showPassword; }

  onLogin() {
    this.feedbackMessage = '';
    this.isSuccess = false;   

    if (!this.mobileNumber || !this.password) {
      this.feedbackMessage = this.isArabic ? 'الرجاء إدخال رقم الجوال وكلمة المرور.' : 'Please enter mobile number and password.';
      return;
    }
    
    this.isLoading = true;
    
    // 🌐 الاستدعاء المعتمد عبر الـ Service القياسي لمنع انكسار السطر 52
    this.authService.loginToServer(this.mobileNumber, this.password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Commercial API Security Response:', response);

        // التحقق من حالة النجاح بناءً على رد السيرفر المعتمد (Success = 1)
        if (response && (response.succeeded === true || response.status === 1)) {
          this.isSuccess = true;
          this.feedbackMessage = 'Login Successful! Redirecting...';
          
          if (response.data) {
            localStorage.setItem('username', response.data.userName || 'Authenticated User');
            localStorage.setItem('userphone', response.data.phoneNumber || this.mobileNumber);
            
            // التقاط الـ accessToken الفعلي كما يرجعه السيرفر بالسواجر بالملي
            const token = response.data.accessToken || response.data.AccessToken || response.data.token;
            if (token) {
              localStorage.setItem('token', token);
            }
          }
          
          // العبور التجاري الفوري لداخل لوحة التحكم والـ Dashboard
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 1000);
        } else {
          this.isSuccess = false;
          this.feedbackMessage = response.message || 'Login failed.';
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Boundary Network Error Checkpoint:', error);
        this.isSuccess = false;
        this.feedbackMessage = 'Authentication failed. Please verify your connection or server credentials.';
      }
    });
  }
}
