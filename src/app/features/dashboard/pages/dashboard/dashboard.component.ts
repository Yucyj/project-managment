import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 🔍 حقل البحث الممتد وزر الـ + Create New المنسق بالكامل باللون الكحلي الداكن -->
    <div class="search-and-action-row">
      <div class="search-input-box">
        <svg class="search-lens-svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search for everything" />
      </div>
      <button class="action-create-btn" type="button">+ Create New</button>
    </div>

    <!-- 📊 كروت المؤشرات الأربعة الهندسية الفاخرة المطابقة لنسخة المشرف 100% بأيقونات SVG خطية رفيعة -->
    <div class="cards-summary-grid">
      
      <!-- الكرت 1: المحفظة (Total Portfolio) -->
      <div class="metric-card">
        <span class="card-label-text">Total Portfolio</span>
        <div class="card-data-line">
          <svg class="metric-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#001a33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <!-- الكرت 2: البرامج (Total Programs) -->
      <div class="metric-card">
        <span class="card-label-text">Total Programs</span>
        <div class="card-data-line">
          <svg class="metric-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#001a33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <!-- الكرت 3: المشاريع (Total Projects) -->
      <div class="metric-card">
        <span class="card-label-text">Total Projects</span>
        <div class="card-data-line">
          <svg class="metric-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#001a33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <!-- الكرت 4: الميزانية الصافية بالريال السعودي (Total Budget) بدون أي إيموجي دائري مكسور -->
      <div class="metric-card">
        <span class="card-label-text">Total Budget</span>
        <div class="card-data-line">
          <!-- أيقونة المحفظة المالية الخطية الأنيقة والبديلة للريال مفرغة بالملي لتطابق التصميم القياسي -->
          <svg class="metric-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#001a33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <strong class="card-value-text">00 <span class="currency-label-text">SAR</span></strong>
        </div>
      </div>
    </div>

    <!-- 📭 شاشة التنبيه الفارغة بالدائرة السماوية الناعمة والمستند الهندسي الدقيق بالمنتصف تماماً -->
    <div class="center-empty-state-container">
      <div class="art-empty-circle-frame">
        <div class="empty-vector-art">
          <!-- محاكاة كربونية للمستند المفرغ المنقط بنفس درجة اللون الأزرق والأقواس الهندسية القياسية -->
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M9 15h.01M12 15h.01M15 15h.01M9 11h.01M12 11h.01" stroke-width="2.5"/>
          </svg>
        </div>
      </div>
      <h3 class="empty-state-heading">No data right now</h3>
      <p class="empty-state-paragraph">Please click on <strong>create new</strong> to choose the suitable option</p>
    </div>
  `,
  styles: [`
    .search-and-action-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      margin-top: 4px;
    }

    .search-input-box {
      display: flex;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 0 18px;
      width: 580px;
      height: 44px;
      box-sizing: border-box;
    }

    .search-lens-svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }

    .search-input-box input {
      border: none;
      background: transparent;
      outline: none;
      margin-inline-start: 10px;
      font-size: 14px;
      width: 100%;
      color: #1e293b;
    }

    .action-create-btn {
      background-color: #0b192c; /* اللون الكحلي الداكن الفاخر والملكي للمشرف */
      color: #ffffff;
      border: none;
      border-radius: 24px;
      padding: 0 36px;
      height: 44px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(11, 25, 44, 0.12);
      transition: background 0.2s;
    }

    .action-create-btn:hover { background-color: #142844; }

    .cards-summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 64px;
    }

    .metric-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 24px;
      box-sizing: border-box;
      text-align: start;
    }

    [dir="rtl"] .metric-card { text-align: right; }

    .card-label-text {
      font-size: 13px;
      color: #0b192c;
      font-weight: 700;
      display: block;
      margin-bottom: 12px;
    }

    .card-data-line {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .metric-svg-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: #0b192c; /* تحويل الأيقونات للون الكحلي الصافي المطابق للمشرف */
    }

    .card-value-text {
      font-size: 26px;
      font-weight: 800;
      color: #0b192c;
    }

    /* تنسيق حرف العملة SAR ليكون خطياً صغيراً وبنفس روعة التصميم المرجعي */
    .currency-label-text {
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      margin-inline-start: 6px;
      vertical-align: middle;
    }

    /* ممركز ومستند التنبيه بالمنتصف تماماً */
    .center-empty-state-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 60px;
    }

    /* الدائرة السماوية الناعمة والمخففة بالكامل حول المستند */
    .art-empty-circle-frame {
      width: 100px;
      height: 100px;
      background-color: #eff6ff; /* اللون السماوي الهادئ والراقي جداً مطابق لنسخة المشرف بالملي */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .empty-vector-art {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-state-heading {
      font-size: 20px;
      font-weight: 800;
      color: #0b192c;
      margin: 0 0 8px 0;
    }

    .empty-state-paragraph {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    
    .empty-state-paragraph strong { color: #0b192c; }
  `]
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}
}
