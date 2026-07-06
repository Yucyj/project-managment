import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="dashboard-wrapper" [dir]="isArabic ? 'rtl' : 'ltr'">
      
      <!-- 📋 1. القائمة الجانبية (Sidebar) -->
      <aside class="sidebar-container">
        <div class="sidebar-header">
          <div class="header-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="logo-zone">PS</div>
          <button type="button" class="collapse-toggle-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        </div>
        
        <nav class="sidebar-nav-links">
          <button class="menu-link active" routerLink="/dashboard" routerLinkActive="active">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
            <span>Dashboard</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Portfolios</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Programs</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Projects</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Change Requests</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Plans</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Users</span>
          </button>
          
          <button class="menu-link">
            <svg class="nav-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2 2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Setting</span>
          </button>
        </nav>
      </aside>

      <!-- 🖥️ 2. منطقة عرض المحتوى -->
      <div class="stage-canvas">
        <header class="top-nav-bar">
          <div class="title-and-search">
            <h1 class="page-title">Dashboard</h1>
          </div>
          
          <div class="user-meta-actions">
            <button type="button" class="language-selector-btn" (click)="toggleLanguage()">
              🌐 {{ isArabic ? 'English' : 'العربية' }}
            </button>
            
            <div class="notification-bell">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#64748b" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            
            <div class="profile-card-badge">
              <div class="avatar-circle">👤</div>
              <div class="profile-text-labels">
                <strong class="account-name">{{ userEmail }}</strong>
                <span class="account-email">{{ userPhone }}</span>
              </div>
              <span class="dropdown-chevron">▼</span>
            </div>
          </div>
        </header>

        <main class="page-body-viewport">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { --sidebar-width: 250px; --topbar-height: 70px; --navy-dark: #0c1e36; --bg-gray: #f8fafc; --border-light: #e2e8f0; }
    .dashboard-wrapper { display: flex; height: 100vh; width: 100vw; background-color: var(--bg-gray); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow: hidden; margin: 0; padding: 0; box-sizing: border-box; }
    .sidebar-container { width: var(--sidebar-width); background-color: #ffffff; border-inline-end: 1px solid var(--border-light); display: flex; flex-direction: column; padding: 24px 16px; box-sizing: border-box; height: 100vh; flex-shrink: 0; }
    .sidebar-header { margin-bottom: 32px; position: relative; display: flex; flex-direction: column; }
    .header-dots { display: flex; gap: 6px; margin-bottom: 12px; }
    .header-dots span { width: 8px; height: 8px; background-color: #cbd5e1; border-radius: 50%; }
    .logo-zone { font-size: 32px; font-weight: 800; color: #1a4273; font-family: 'Times New Roman', Times, serif; }
    .collapse-toggle-btn { position: absolute; top: 20px; right: -28px; background: #ffffff; border: 1px solid var(--border-light); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); z-index: 10; }
    [dir="rtl"] .collapse-toggle-btn { left: -28px; right: auto; transform: rotate(180deg); }
    .sidebar-nav-links { display: flex; flex-direction: column; gap: 4px; }
    .menu-link { background: transparent; border: none; padding: 12px 14px; text-align: start; font-size: 14px; color: #475569; font-weight: 600; cursor: pointer; border-radius: 8px; display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; }
    [dir="rtl"] .menu-link { text-align: right; }
    .menu-link:hover { background-color: #f1f5f9; }
    .menu-link.active { background-color: var(--navy-dark); color: #ffffff; }
    .nav-svg-icon { flex-shrink: 0; }
    .stage-canvas { flex: 1; display: flex; flex-direction: column; overflow: hidden; height: 100vh; }
    .top-nav-bar { background-color: #ffffff; padding: 0 32px; height: var(--topbar-height); border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; flex-shrink: 0; }
    .title-and-search { display: flex; align-items: center; gap: 24px; }
    .page-title { font-size: 20px; font-weight: 800; color: var(--navy-dark); margin: 0; }
    .user-meta-actions { display: flex; align-items: center; gap: 24px; }
    .language-selector-btn { background: transparent; border: none; color: var(--navy-dark); font-size: 13px; font-weight: 700; cursor: pointer; }
    .notification-bell { color: #64748b; cursor: pointer; display: flex; align-items: center; }
    .profile-card-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .avatar-circle { width: 32px; height: 32px; border-radius: 50%; background-color: #f1f5f9; color: #64748b; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-light); }
    .profile-text-labels { display: flex; flex-direction: column; text-align: start; }
    [dir="rtl"] .profile-text-labels { text-align: right; }
    .account-name { font-size: 13px; color: #1e293b; font-weight: 700; }
    .account-email { font-size: 11px; color: #94a3b8; }
    .dropdown-chevron { font-size: 10px; color: #94a3b8; }
    .page-body-viewport { flex: 1; padding: 24px 32px; overflow-y: auto; box-sizing: border-box; background-color: var(--bg-gray); }
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