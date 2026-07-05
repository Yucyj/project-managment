import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout-shell" [dir]="isArabic ? 'rtl' : 'ltr'">
      
      <!-- 📋 1. القائمة الجانبية -->
      <aside class="sidebar-wrapper">
        <div class="sidebar-top-bar">
          <div class="three-dots-container">
            <span class="dot-element"></span>
            <span class="dot-element"></span>
            <span class="dot-element"></span>
          </div>
          
          <div class="branding-logo">PS</div>
          
          <button class="collapse-icon-button" type="button">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
        </div>
        
        <nav class="sidebar-navigation">
          <button class="sidebar-nav-link active" routerLink="/dashboard" routerLinkActive="active">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
            <span>Dashboard</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Portfolios</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Programs</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Projects</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Change Requests</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Plans</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Users</span>
          </button>
          
          <button class="sidebar-nav-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2 2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Setting</span>
          </button>
        </nav>
      </aside>

      <!-- 🖥️ 2. منطقة عرض المحتوى الرئيسي -->
      <div class="content-canvas-area">
        <header class="app-header-bar">
          <div class="header-left-group">
            <h1 class="header-title-text">Dashboard</h1>
          </div>
          
          <div class="header-right-group">
            <button class="language-selection-button" type="button" (click)="toggleLanguage()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-inline-end: 4px;"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              <span>العربية</span>
            </button>
            
            <div class="header-notification-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            
            <div class="header-profile-badge">
              <div class="avatar-circle">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="profile-meta-text">
                <span class="user-display-name">{{ userEmail }}</span>
                <span class="user-sub-email">PMO Email</span>
              </div>
              <span class="profile-dropdown-arrow">▼</span>
            </div>
          </div>
        </header>

        <main class="router-view-canvas">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --sidebar-navy-dark: #0a2540;
      --bg-canvas-gray: #f8fafc;
      --border-light-gray: #e2e8f0;
      --text-slate: #334155;
    }

    .app-layout-shell { display: flex; height: 100vh; width: 100vw; background-color: var(--bg-canvas-gray); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow: hidden; margin: 0; padding: 0; box-sizing: border-box; }
    .sidebar-wrapper { width: 240px; background-color: #ffffff; border-inline-end: 1px solid var(--border-light-gray); display: flex; flex-direction: column; padding: 24px 16px; box-sizing: border-box; height: 100vh; }
    .sidebar-top-bar { margin-bottom: 28px; display: flex; flex-direction: column; align-items: center; position: relative; width: 100%; }
    .three-dots-container { display: flex; gap: 5px; margin-bottom: 12px; justify-content: center; }
    .dot-element { width: 7px; height: 7px; background-color: #cbd5e1; border-radius: 50%; }
    .branding-logo { font-size: 32px; font-weight: 800; color: var(--sidebar-navy-dark); font-family: 'Times New Roman', Times, serif; text-align: center; }
    
    .collapse-icon-button { position: absolute; top: 18px; right: 4px; background: #f1f5f9; border: 1px solid var(--border-light-gray); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: all 0.2s; }
    .collapse-icon-button:hover { background-color: #e2e8f0; }
    [dir="rtl"] .collapse-icon-button { left: 4px; right: auto; transform: rotate(180deg); }

    .sidebar-navigation { display: flex; flex-direction: column; gap: 4px; width: 100%; }
    .sidebar-nav-link { background: transparent; border: none; padding: 11px 14px; text-align: start; font-size: 14px; color: #475569; font-weight: 600; cursor: pointer; border-radius: 8px; display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; }
    [dir="rtl"] .sidebar-nav-link { text-align: right; }
    .sidebar-nav-link:hover { background-color: #f8fafc; }
    .sidebar-nav-link.active { background-color: var(--sidebar-navy-dark); color: #ffffff; }
    .nav-svg-icon { flex-shrink: 0; }

    .content-canvas-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; height: 100vh; }
    .app-header-bar { background-color: #ffffff; padding: 0 32px; height: 65px; border-bottom: 1px solid var(--border-light-gray); display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; }
    .header-title-text { font-size: 20px; font-weight: 800; color: var(--sidebar-navy-dark); margin: 0; }
    .header-right-group { display: flex; align-items: center; gap: 20px; }
    .language-selection-button { background: transparent; border: none; color: #475569; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; }
    .header-notification-icon { color: #475569; cursor: pointer; display: flex; align-items: center; }
    .header-profile-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .avatar-circle { width: 30px; height: 30px; border-radius: 50%; background-color: #f1f5f9; color: #475569; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-light-gray); }
    .profile-meta-text { display: flex; flex-direction: column; text-align: start; }
    [dir="rtl"] .profile-meta-text { text-align: right; }
    .user-display-name { font-size: 13px; color: var(--text-slate); font-weight: 700; }
    .user-sub-email { font-size: 11px; color: #94a3b8; }
    .profile-dropdown-arrow { font-size: 10px; color: #94a3b8; }
    .router-view-canvas { flex: 1; padding: 24px 32px; overflow-y: auto; box-sizing: border-box; }
  `]
})
export class MainLayoutComponent implements OnInit {
  isArabic = false;
  userEmail = 'PMO Name';
  userPhone = 'PMO Lead';

  ngOnInit() {
    const savedEmail = localStorage.getItem('username');
    const savedPhone = localStorage.getItem('userphone');
    if (savedEmail) this.userEmail = savedEmail;
    if (savedPhone) this.userPhone = savedPhone;
  }

  toggleLanguage(): void {
    this.isArabic = !this.isArabic;
  }
}