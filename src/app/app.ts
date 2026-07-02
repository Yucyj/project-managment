import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isArabic = true;
  showPassword = false;
  mobileNumber = '';
  password = '';
  feedbackMessage = '';
  currentSlide = 0;
  slides = [
    { title: 'Control Every Project From One Place', desc: 'Track performance, assign responsibilities, and keep every workflow aligned efficiently.' },
    { title: 'Predictive Analytical Integrity', desc: 'Monitor resource anomalies and secure corporate task parameters instantly.' }
  ];

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}
  toggleLanguage() { this.isArabic = !this.isArabic; }
  setSlide(index: number) { this.currentSlide = index; }

  onLogin() {
    this.feedbackMessage = '';

    if (!this.mobileNumber || !this.password) {
      this.feedbackMessage = this.isArabic ? 'الرجاء إدخال رقم الجوال وكلمة المرور.' : 'Please enter mobile number and password.';
      return;
    }

    // 🚀 Calling the exact case-sensitive Swagger authentication gate
    this.authService.loginToServer(this.mobileNumber, this.password).subscribe({
      next: (response) => {
        if (response && response.succeeded) {
          // Double-check the physical label or server response schema to confirm token values match exactly
          localStorage.setItem('token', response.data?.token || '');
          localStorage.setItem('username', response.data?.userName || '');
          
          this.router.navigateByUrl('/dashboard/index');
        } else {
          this.feedbackMessage = response.message || (this.isArabic ? 'فشل تسجيل الدخول.' : 'Login failed.');
        }
      },
      error: (err) => {
        console.error('Swagger gate boundary check:', err);
        this.feedbackMessage = this.isArabic 
          ? 'خطأ في الاتصال بالخادم. تأكد من إدخال البيانات بشكل صحيح.' 
          : 'Server authentication failed. Please check your credentials.';
      }
    });
  }
}
