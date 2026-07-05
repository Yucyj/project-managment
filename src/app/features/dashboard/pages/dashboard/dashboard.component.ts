import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container" [dir]="isArabic ? 'rtl' : 'ltr'">
      
      <!-- 📋 1. Left Sidebar Navigation Panel -->
      <aside class="sidebar">
        <div class="brand-zone">
          <span class="logo-text">PS</span>
          <button class="collapse-btn">⇦</button>
        </div>
        
        <nav class="nav-menu">
          <button class="nav-item active">📊 Dashboard</button>
          <button class="nav-item">💼 Portfolios</button>
          <button class="nav-item">📦 Programs</button>
          <button class="nav-item">📁 Projects</button>
          <button class="nav-item">🔄 Change Requests</button>
          <button class="nav-item">📅 Plans</button>
          <button class="nav-item">👥 Users</button>
          <button class="nav-item">⚙️ Setting</button>
        </nav>
      </aside>

      <!-- 🖥️ 2. Main Dashboard Operational Canvas Layout -->
      <div class="main-canvas">
        
        <!-- Top Toolbar Utility Action Block -->
        <header class="top-bar">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" [placeholder]="isArabic ? 'البحث عن أي شيء...' : 'Search for everything...'" />
          </div>
          
          <div class="utility-actions">
            <button class="lang-toggle" (click)="toggleLanguage()">
              🌐 {{ isArabic ? 'English' : 'العربية' }}
            </button>
            
            <!-- 👤 Live User Metrics Linked to Session State Storage Keys -->
            <div class="user-profile">
              <div class="avatar">👤</div>
              <div class="user-info">
                <span class="username">{{ userEmail }}</span>
                <span class="role">{{ userPhone }}</span>
              </div>
            </div>

            <button class="create-btn" (click)="onCreateNew()">+ Create New</button>
          </div>
        </header>

        <!-- Main Content Area Panel Viewport -->
        <main class="content-viewport">
          <h2 class="view-title">Dashboard</h2>

          <!-- 📊 3. Metric Summary Analytical Grid Layout -->
          <div class="metrics-grid">
            <div class="card">
              <span class="card-label">Total Portfolio</span>
              <h2 class="card-value">🗂️ 0</h2>
            </div>
            <div class="card">
              <span class="card-label">Total Programs</span>
              <h2 class="card-value">📦 0</h2>
            </div>
            <div class="card">
              <span class="card-label">Total Projects</span>
              <h2 class="card-value">📋 0</h2>
            </div>
            <div class="card">
              <span class="card-label">Total Budget</span>
              <h2 class="card-value">00 <small>{{ isArabic ? 'ر.س' : 'SAR' }}</small></h2>
            </div>
          </div>

          <!-- 📭 4. Center Minimalist Alert Canvas (Empty State Placeholder) -->
          <div class="empty-state-canvas">
            <div class="empty-icon-circle">
              <span class="pulse-dot"></span>
            </div>
            <h3>No data right now</h3>
            <p>Please click on <strong>create new</strong> to choose the suitable option</p>
          </div>
        </main>
      </div>

    </div>
  `,
  styles: [`
    .dashboard-container { display: flex; height: 100vh; width: 100vw; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; margin: 0; }
    
    /* Sidebar Styles matching your clean dark-navy layout */
    .sidebar { width: 240px; background-color: #0b192c; color: #ffffff; display: flex; flex-direction: column; padding: 24px 16px; box-sizing: border-box; border-inline-end: 1px solid #1e293b; }
    .brand-zone { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding: 0 8px; }
    .logo-text { font-size: 28px; font-weight: 900; color: #0066ff; font-family: 'Times New Roman', serif; letter-spacing: 1px; }
    .collapse-btn { background: transparent; border: none; color: #64748b; cursor: pointer; font-size: 16px; }
    .nav-menu { display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .nav-item { background: transparent; border: none; color: #94a3b8; padding: 12px 14px; text-align: start; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: all 0.2s; width: 100%; display: flex; align-items: center; gap: 10px; }
    [dir="rtl"] .nav-item { text-align: right; }
    .nav-item:hover, .nav-item.active { background-color: #1e293b; color: #ffffff; }
    .nav-item.active { background-color: #0044cc; color: #ffffff; }

    /* Main Canvas Area Layout Container */
    .main-canvas { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: #ffffff; }
    .top-bar { height: 70px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; padding: 0 32px; box-sizing: border-box; background-color: #ffffff; }
    .search-wrapper { display: flex; align-items: center; background-color: #f1f5f9; border-radius: 20px; padding: 6px 16px; width: 280px; }
    .search-wrapper input { border: none; background: transparent; outline: none; margin-inline-start: 8px; font-size: 14px; width: 100%; }
    .utility-actions { display: flex; align-items: center; gap: 24px; }
    .lang-toggle { background: transparent; border: none; color: #0066ff; font-weight: 700; font-size: 14px; cursor: pointer; }
    .user-profile { display: flex; align-items: center; gap: 10px; }
    .avatar { font-size: 24px; background: #e2e8f0; padding: 6px; border-radius: 50%; }
    .user-info { display: flex; flex-direction: column; text-align: start; }
    [dir="rtl"] .user-info { text-align: right; }
    .username { font-size: 14px; font-weight: 700; color: #1e293b; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .role { font-size: 12px; color: #64748b; }
    .create-btn { background-color: #0b192c; color: #ffffff; border: none; border-radius: 20px; padding: 10px 24px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
    .create-btn:hover { background-color: #1e293b; }

    /* Content Area and Summary Metric Cards Viewport Grid */
    .content-viewport { flex: 1; padding: 32px; overflow-y: auto; background-color: #f8fafc; box-sizing: border-box; display: flex; flex-direction: column; }
    .view-title { font-size: 22px; font-weight: 800; color: #0b192c; margin: 0 0 24px 0; text-align: start; }
    [dir="rtl"] .view-title { text-align: right; }
    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.02); text-align: start; }
    [dir="rtl"] .card { text-align: right; }
    .card-label { font-size: 13px; color: #64748b; font-weight: 600; display: block; margin-bottom: 8px; }
    .card-value { font-size: 22px; font-weight: 800; color: #0b192c; margin: 0; }

    /* Empty State Canvas Styling Box */
    .empty-state-canvas { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
    .empty-icon-circle { width: 44px; height: 44px; border-radius: 50%; background-color: #0066ff; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; position: relative; }
    .pulse-dot { width: 8px; height: 8px; background-color: #ffffff; border-radius: 50%; }
    .empty-state-canvas h3 { font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
    .empty-state-canvas p { font-size: 14px; color: #64748b; margin: 0; }
  `]
})
export class DashboardComponent implements OnInit {
  isArabic = false;
  userEmail = 'no@example.com';
  userPhone = '0673243';

  ngOnInit() {
    // 🛡️ Safe tracking verification extraction layer
    const savedEmail = localStorage.getItem('username');
    const savedPhone = localStorage.getItem('userphone');
    if (savedEmail) this.userEmail = savedEmail;
    if (savedPhone) this.userPhone = savedPhone;
  }

  toggleLanguage(): void {
    this.isArabic = !this.isArabic;
  }

  onCreateNew(): void {
    console.log('Create New dialog requested.');
  }
}
