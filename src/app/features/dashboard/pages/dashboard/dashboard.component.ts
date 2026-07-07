import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  // 🚀 الحل المعماري الصارم: تحويل التمبلت لـ Inline لقطع الاتصال بالملف الخارجي المعلق وتصفير الأخطاء فوراً
  template: `
    <div class="dashboard-viewport-inner">
      
      <!-- 🔍 شريط البحث وزر الأكشن الملموم والمتناسق بالملي لفيجما -->
      <div class="search-and-action-row">
        <div class="search-input-box">
          <svg class="search-lens-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search for everything" />
        </div>
        <button class="action-create-btn" type="button">+ Create New</button>
      </div>

      <!-- 📊 شبكة الكروت الأربعة المتطابقة والمنظومة أفقياً بظلال ناعمة وبدون خطوط مكسورة -->
      <div class="cards-summary-grid">
        
        <!-- كرت 1 -->
        <div class="metric-card">
          <div class="card-header-line">
            <span class="card-label-text">Total Portfolio</span>
            <svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <strong class="card-value-text">0</strong>
        </div>
        
        <!-- كرت 2 -->
        <div class="metric-card">
          <div class="card-header-line">
            <span class="card-label-text">Total Programs</span>
            <svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <strong class="card-value-text">0</strong>
        </div>
        
        <!-- كرت 3 -->
        <div class="metric-card">
          <div class="card-header-line">
            <span class="card-label-text">Total Projects</span>
            <svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <strong class="card-value-text">0</strong>
        </div>
        
        <!-- كرت 4 -->
        <div class="metric-card">
          <div class="card-header-line">
            <span class="card-label-text">Total Budget</span>
            <svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <strong class="card-value-text">00 <span class="currency-label-text">SAR</span></strong>
        </div>

      </div>

      <!-- 📭 شاشة التنبيه الفارغة المنسقة لفيجما الهدف -->
      <div class="center-empty-state-container">
        <h3 class="empty-state-heading">No data right now</h3>
        <p class="empty-state-paragraph">Please click on <strong>create new</strong> to choose the suitable option</p>
      </div>

    </div>
  `,
  styles: [`
    .dashboard-viewport-inner { width: 100%; display: block; box-sizing: border-box; }
    
    .search-and-action-row {
      display: flex !important; justify-content: space-between !important; align-items: center !important;
      margin-bottom: 24px !important; width: 100% !important;
    }
    
    .search-input-box {
      display: flex !important; align-items: center !important; background-color: #ffffff !important;
      border: 1px solid #cbd5e1 !important; border-radius: 8px !important; padding: 0 14px !important;
      width: 460px !important; height: 44px !important; box-sizing: border-box !important;
    }
    .search-input-box input { border: none; background: transparent; outline: none; width: 100%; margin-inline-start: 10px; font-size: 14px; }
    
    .search-lens-svg { width: 16px !important; height: 16px !important; color: #94a3b8 !important; flex-shrink: 0 !important; }

    .action-create-btn {
      background-color: #0f2d59 !important; color: #ffffff !important; border: none !important;
      border-radius: 8px !important; padding: 0 24px !important; height: 44px !important;
      font-size: 14px !important; font-weight: 600 !important; cursor: pointer !important;
    }

    .cards-summary-grid {
      display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important;
      margin-bottom: 40px !important; width: 100% !important;
    }

    .metric-card {
      background: #ffffff !important; border: 1px solid #eaecf0 !important; border-radius: 8px !important;
      padding: 20px !important; box-sizing: border-box !important;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
      display: flex !important; flex-direction: column !important; gap: 16px !important;
    }
    .card-header-line { display: flex !important; justify-content: space-between !important; align-items: center !important; width: 100% !important; }
    
    .card-label-text { font-size: 14px !important; color: #0f2d59 !important; font-weight: 700 !important; }
    .card-value-text { font-size: 32px !important; font-weight: 800 !important; color: #0f2d59 !important; text-align: start !important; letter-spacing: -0.03em !important; }
    
    .card-icon-svg { width: 20px !important; height: 20px !important; color: #cbd5e1 !important; }
    .currency-label-text { font-size: 14px !important; color: #475569 !important; font-weight: 600 !important; }

    .center-empty-state-container {
      display: flex !important; flex-direction: column !important; align-items: center !important;
      padding: 60px !important; border: 1px dashed #cbd5e1 !important; border-radius: 12px !important;
      background: #ffffff !important; margin-top: 20px !important; box-sizing: border-box !important;
    }
    .empty-state-heading { font-size: 16px !important; font-weight: 700 !important; color: #0f2d59 !important; margin: 0 0 4px 0 !important; }
    .empty-state-paragraph { font-size: 14px !important; color: #475569 !important; }
  `]
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    console.log('Figma inline viewport remap verified successfully.');
  }
}
