import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="split-screen" [dir]="isArabic ? 'rtl' : 'ltr'">
      <div class="left-section">
        <div class="brand-logo">PS</div>
        <div class="illustration-container">
          <div class="mock-dashboard">
            <div class="mock-header"><span class="w-dot"></span><span class="w-dot"></span><span class="w-dot"></span></div>
            <div class="mock-body">
              <div class="mock-sidebar"></div>
              <div class="mock-content">
                <div class="mock-task-card">
                  <div class="task-title">TASKS</div>
                  <div class="task-btn">+ Add Task</div>
                  <div class="task-line long"></div><div class="task-line short"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="character-avatar"><div class="char-head"></div><div class="char-body"></div></div>
          <div class="plant-deco">🌱</div>
        </div>
        <h1 class="headline">{{ slides[currentSlide].title }}</h1>
        <p class="description">{{ slides[currentSlide].desc }}</p>
        <div class="slider-dots">
          <span *ngFor="let s of slides; let i = index" class="dot" [class.active]="i === currentSlide" (click)="setSlide(i)"></span>
        </div>
      </div>
      <div class="right-section">
        <div class="lang-selector" (click)="toggleLanguage()">
          <svg class="icon-svg color-navy" viewBox="0 0 24 24"><path d="M12.003 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm-5.5-7h11M12.003 4.5v15M12.003 5.5c2 2.5 2 8.5 0 11m0-11c-2 2.5-2 8.5 0 11"/></svg>
          <span>{{ isArabic ? 'English' : 'العربية' }}</span>
        </div>
        <div class="form-wrapper">
          <h2 class="form-title">{{ isArabic ? 'تسجيل الدخول' : 'Login' }}</h2>
          <form (ngSubmit)="onLogin()">
            <div class="input-group">
              <label for="mobile">{{ isArabic ? 'رقم الجوال' : 'Mobile Number' }}</label>
              <div class="input-with-icon">
                <svg class="icon-svg color-gray" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.26 1.02l-2.2 2.2z"/></svg>
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
                  <svg *ngIf="!notShowPassword" class="icon-svg color-gray" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                </span>
              </div>
              <a href="#" class="forgot-link">{{ isArabic ? 'نسيت كلمة المرور؟' : 'Forgot Password?' }}</a>
            </div>
            <button type="submit" class="submit-btn"><span>{{ isArabic ? 'دخول' : 'Login' }}</span> <span>&rarr;</span></button>
          </form>
          <div *ngIf="feedbackMessage" [ngClass]="isSuccess ? 'msg-success' : 'msg-error'">{{ feedbackMessage }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --primary-blue: #0066ff; --dark-navy: #0a1931; --text-gray: #6b7280; --border-light: #e5e7eb; }
    .split-screen { display: flex; height: 100vh; max-height: 100vh; overflow: hidden; font-family: sans-serif; margin: 0; background-color: #ffffff; }
    .left-section { flex: 1; background-color: var(--primary-blue); color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; position: relative; }
    .brand-logo { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
    .illustration-container { position: relative; width: 320px; height: 200px; margin-bottom: 30px; }
    .mock-dashboard { background: white; width: 220px; height: 150px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); overflow: hidden; position: absolute; left: 20px; top: 10px; }
    .mock-header { background: #f3f4f6; padding: 6px; display: flex; gap: 4px; }
    .mock-header .w-dot { width: 6px; height: 6px; background: #d1d5db; border-radius: 50%; }
    .mock-task-card { padding: 12px; color: #333; text-align: left; }
    .task-title { font-size: 11px; font-weight: bold; }
    .task-btn { background: var(--primary-blue); color: white; font-size: 8px; padding: 3px 6px; border-radius: 4px; display: inline-block; margin: 4px 0; }
    .task-line { height: 6px; background: #e5e7eb; margin-top: 6px; border-radius: 2px; }
    .task-line.long { width: 80%; } .task-line.short { width: 50%; }
    .character-avatar { position: absolute; right: 30px; bottom: 10px; width: 60px; height: 120px; }
    .char-head { width: 24px; height: 24px; background: #ffdbac; border-radius: 50%; margin: 0 auto; }
    .char-body { width: 36px; height: 70px; background: #1e3a8a; border-radius: 6px 6px 0 0; margin-top: 4px; }
    .plant-deco { position: absolute; left: 10px; bottom: 10px; font-size: 24px; }
    .headline { font-size: 24px; font-weight: 600; margin: 0 0 12px 0; }
    .description { font-size: 14px; opacity: 0.9; margin: 0 0 25px 0; height: 45px; }
    .slider-dots { display: flex; gap: 10px; }
    .slider-dots .dot { width: 12px; height: 12px; border: 1px solid white; border-radius: 50%; cursor: pointer; }
    .slider-dots .dot.active { background: white; }
    .right-section { flex: 1; display: flex; flex-direction: column; position: relative; padding: 40px; justify-content: center; }
    .lang-selector { position: absolute; top: 40px; display: flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; font-weight: 600; }
    [dir="rtl"] .lang-selector { left: 60px; right: auto; } [dir="ltr"] .lang-selector { right: 60px; left: auto; }
    .form-wrapper { width: 100%; max-width: 400px; margin: 0 auto; }
    .form-title { font-size: 42px; font-weight: bold; color: var(--primary-blue); margin: 0 0 35px 0; }
    .input-group { margin-bottom: 20px; text-align: start; }
    .input-group label { display: block; margin-bottom: 8px; font-size: 14px; color: #374151; }
    .input-with-icon { display: flex; align-items: center; background-color: #f9fafb; border: 1px solid var(--border-light); border-radius: 8px; padding: 0 14px; height: 50px; }
    .icon-svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .color-gray { color: #9ca3af; }
    .color-blue { color: #0066ff; }
    .color-navy { color: #0a1931; }
    [dir="rtl"] .icon-svg { margin-left: 10px; } [dir="ltr"] .icon-svg { margin-right: 10px; }
    [dir="rtl"] .country-code { margin-left: 12px; } [dir="ltr"] .country-code { margin-right: 12px; }
    .input-with-icon input { flex: 1; border: none; background: transparent; height: 100%; font-size: 15px; outline: none; }
    .toggle-password { cursor: pointer; display: flex; align-items: center; }
    .forgot-link { display: block; font-size: 13px; color: var(--text-gray); text-decoration: none; margin-top: 8px; }
    [dir="rtl"] .forgot-link { text-align: left; } [dir="ltr"] .forgot-link { text-align: right; }
    .submit-btn { width: 100%; height: 50px; background-color: var(--dark-navy); color: #ffffff; border: none; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 25px; }
    .msg-success { background-color: #dcfce7; color: #166534; padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center; }
    .msg-error { background-color: #fee2e2; color: #991b1b; padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Yucyj Project Manager"; mobileNumber = ''; password = ''; isArabic = false; showPassword = false; feedbackMessage = ''; isSuccess = false; currentSlide = 0; slideTimer: any;
  slides = [
    { title: 'Control Every Project From One Place', desc: 'Track performance, assign responsibilities, and keep every workflow aligned efficiently.' },
    { title: 'Real-time Workflow Validation', desc: 'Monitor team progress and secure system entry points seamlessly from any dashboard.' },
    { title: 'Optimize Team Resource Distribution', desc: 'Ensure balanced operational loads and accelerate technical feature delivery.' }
  ];
  ngOnInit() { this.startSlider(); }
  ngOnDestroy() { if (this.slideTimer) { clearInterval(this.slideTimer); } }
  startSlider() { this.slideTimer = setInterval(() => { this.currentSlide = (this.currentSlide + 1) % this.slides.length; }, 4000); }