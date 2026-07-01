import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="split-screen" [dir]="isArabic ? 'rtl' : 'ltr'">
      <div class="left-section">
        <div class="brand-logo">PS</div>
        <div class="illustration-container">
          <img src="dashboard.png" alt="Project Dashboard" class="main-project-img" />
        </div>
        <h1 class="headline">{{ slides[currentSlide].title }}</h1>
        <p class="description">{{ slides[currentSlide].desc }}</p>
        <div class="slider-dots">
          <span *ngFor="let s of slides; let i = index" class="dot" [class.active]="i === currentSlide" (click)="setSlide(i)"></span>
        </div>
      </div>

      <div class="right-section">
        <div class="lang-selector" (click)="toggleLanguage()">
          <svg class="icon-svg color-navy" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
          <span>{{ isArabic ? 'English' : 'العربية' }}</span>
        </div>

        <div class="form-wrapper">
          <h2 class="form-title">{{ isArabic ? 'تسجيل الدخول' : 'Login' }}</h2>
          <form (ngSubmit)="onLogin()">
            <div class="input-group">
              <label for="mobile">{{ isArabic ? 'رقم الجوال' : 'Mobile Number' }}</label>
              <div class="input-with-icon">
                <svg class="icon-svg color-gray" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span class="country-code">+966</span>
                <input id="mobile" type="text" [(ngModel)]="mobileNumber" name="mobileNumber" placeholder="5xxxxxxxx" required />
              </div>
            </div>

            <div class="input-group">
              <label for="password">{{ isArabic ? 'كلمة المرور' : 'Password' }}</label>
              <div class="input-with-icon">
                <svg class="icon-svg color-gray" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input id="password" [type]="showPassword ? 'text' : 'password'" [(ngModel)]="password" name="password" placeholder="••••••••" required />
                <span class="toggle-password" (click)="showPassword = !showPassword">
                  <svg *ngIf="showPassword" class="icon-svg color-blue" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>
                  <svg *ngIf="!showPassword" class="icon-svg color-gray" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                </span>
              </div>
              <a href="#" class="forgot-link-blue">{{ isArabic ? 'نسيت كلمة المرور؟' : 'Forgot Password?' }}</a>
            </div>

            <button type="submit" class="submit-btn">
              <span>{{ isArabic ? 'دخول' : 'Login' }}</span> <span>&rarr;</span>
            </button>
          </form>
          <div *ngIf="feedbackMessage" class="msg-error">{{ feedbackMessage }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --primary-blue: #0066ff; --dark-navy: #111827; --text-gray: #6b7280; --border-light: #e5e7eb; }
    html, body { margin: 0 !important; padding: 0 !important; height: 100vh !important; max-height: 100vh !important; overflow: hidden !important; }
    .split-screen { display: flex; height: 100vh; max-height: 100vh; overflow: hidden !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; background-color: #ffffff; }
    .left-section { flex: 1; background-color: var(--primary-blue); color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; text-align: center; position: relative; overflow: hidden !important; height: 100vh; box-sizing: border-box; }
    .brand-logo { font-size: 64px; font-weight: bold; margin-bottom: 15px; font-family: 'Times New Roman', Times, serif; }
    .illustration-container { width: 100%; max-width: 290px; height: auto; max-height: 40vh; margin-bottom: 25px; display: flex; justify-content: center; align-items: center; overflow: hidden; }
    .main-project-img { width: 100%; height: auto; max-height: 100%; object-fit: contain; }
    .headline { font-size: 20px; font-weight: 800; margin: 0 0 10px 0; max-width: 440px; line-height: 1.4; letter-spacing: 0.3px; }
    .description { font-size: 15px; opacity: 0.85; margin: 0 0 20px 0; height: 45px; max-width: 400px; line-height: 1.6; font-weight: 400; }
    .slider-dots { display: flex; gap: 10px; }
    .slider-dots .dot { width: 12px; height: 12px; border: 1px solid white; border-radius: 50%; cursor: pointer; transition: background 0.3s; }
    .slider-dots .dot.active { background: white; }
    .right-section { flex: 1; display: flex; flex-direction: column; position: relative; padding: 40px; justify-content: center; overflow: hidden !important; height: 100vh; box-sizing: border-box; }
    .lang-selector { position: absolute; top: 40px; display: flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; font-weight: 600; }
    [dir="rtl"] .lang-selector { left: 60px; right: auto; } [dir="ltr"] .lang-selector { right: 60px; left: auto; }
    .form-wrapper { width: 100%; max-width: 400px; margin: 0 auto; }
    .form-title { font-size: 54px; font-weight: bold; color: var(--primary-blue); margin: 0 0 30px 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .input-group { margin-bottom: 20px; text-align: start; }
    .input-group label { display: block; margin-bottom: 8px; font-size: 14px; color: #374151; font-weight: 500; }
    .input-with-icon { display: flex; align-items: center; background-color: #f9fafb; border: 1px solid var(--border-light); border-radius: 8px; padding: 0 14px; height: 50px; }
    .input-with-icon:focus-within { border-color: var(--primary-blue); background-color: #ffffff; }
    .icon-svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .color-gray { color: #9ca3af; } .color-blue { color: #0066ff; } .color-navy { color: #0a1931; }
    [dir="rtl"] .icon-svg { margin-left: 10px; } [dir="ltr"] .icon-svg { margin-right: 10px; }
    [dir="rtl"] .country-code { margin-left: 12px; } [dir="ltr"] .country-code { margin-right: 12px; }
    .input-with-icon input { flex: 1; border: none; background: transparent; height: 100%; font-size: 15px; outline: none; color: #111111; }
    .input-with-icon input::placeholder { color: #9ca3af; opacity: 0.8; }
    .toggle-password { cursor: pointer; display: flex; align-items: center; }
    .forgot-link-blue { display: block; font-size: 13px; color: var(--primary-blue); text-decoration: none; margin-top: 8px; font-weight: 500; }
    [dir="rtl"] .forgot-link-blue { text-align: left; } [dir="ltr"] .forgot-link-blue { text-align: right; }
    .forgot-link-blue:hover { text-decoration: underline; }
    .submit-btn { width: 100%; height: 50px; background-color: #111827; color: #ffffff; border: none; border-radius: 25px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 25px; }
    .submit-btn:hover { background-color: #1f2937; }
    .msg-error { background-color: #fee2e2; color: #991b1b; padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center; font-size: 14px; }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  mobileNumber = ''; 
  password = ''; 
  isArabic = false; 
  showPassword = false; 
  feedbackMessage = ''; 
  isSuccess = false; 
  currentSlide = 0; 
  slideTimer: any;
  
  slides = [
    { title: 'Control Every Project From One Place', desc: 'Track performance, assign responsibilities, and keep every workflow aligned efficiently.' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() { this.startSlider(); }
  
  ngOnDestroy() { 
    if (this.slideTimer) { 
      clearInterval(this.slideTimer); 
    } 
  }
  
  startSlider() { 
    this.slideTimer = setInterval(() => { 
      this.currentSlide = (this.currentSlide + 1) % this.slides.length; 
    }, 4000); 
  }
  
  setSlide(index: number) { 
    this.currentSlide = index; 
    clearInterval(this.slideTimer); 
    this.startSlider(); 
  }
  
  toggleLanguage() { this.isArabic = !this.isArabic; }

  onLogin() {
    this.feedbackMessage = '';
    this.isSuccess = false;

    this.authService.loginToServer(this.mobileNumber, this.password).subscribe({
      next: (response: any) => {
        console.log('Full ProSync API Response Payload:', response);
        if (response && response.succeeded) {
          this.isSuccess = true;
          localStorage.setItem('username', response.data.userName);
          localStorage.setItem('userphone', response.data.phoneNumber);
          this.router.navigateByUrl('/dashboard/index');
        } else {
          this.isSuccess = false;
          this.feedbackMessage = response.message || 'Login failed.';
        }
      },
      error: (error) => {
        console.error('API Server Error response stream checkpoint:', error);
        this.isSuccess = false;
        this.feedbackMessage = 'Connection blocked or incorrect credentials. Review console layers.';
      }
    });
  }
}