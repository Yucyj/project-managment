import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  // 🚀 التعديل المعماري التجاري: إيقاف العزل لتمكين الـ CSS من اختراق أي كاش وإجبار الأيقونات على الانكماش فوراً
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  styles: [`
    /* ==========================================================================
       🔒 FIGMA VECTOR CONSTRAINTS & CORE LAYOUT POLISH (FORCE OVERRIDE)
       ========================================================================== */
    
    /* 🚀 قفل الحجم: إجبار كافة الأيقونات والـ SVGs المكسورة داخل السايدبار على الانكماش الفوري لحجم 18px منعاً لانفجارها نهائياً */
    .figma-sidebar svg, .nav-icon, svg {
      width: 18px !important;
      height: 18px !important;
      max-width: 18px !important;
      max-height: 18px !important;
      min-width: 18px !important;
      min-height: 18px !important;
      flex-shrink: 0 !important;
      display: inline-block !important;
      color: currentColor !important;
    }

    /* إجبار السايدبار الخارجي على حجم ملموم ومحدد وثابت لفيجما الهدف الحين */
    aside, .sidebar, .figma-sidebar {
      width: 240px !important;
      max-width: 240px !important;
      min-width: 240px !important;
      background-color: #f8fafc !important; /* درجة رمادي السايدبار بالهدف بالملي */
      border-right: 1px solid #e2e8f0 !important;
      display: flex !important;
      flex-direction: column !important;
      flex-shrink: 0 !important;
    }

    /* 🔵 تحويل كافة الكلمات ونصوص الواجهة بالكامل من الأسود المكتوم إلى الكحلي المشرق لفيجما الهدف بدقة */
    .brand-text, .page-title, .user-email-label, .empty-state-heading, .card-label-text, .card-value-text { 
      color: #0f2d59 !important; 
    }

    /* ضبط أبعاد وحواف الـ Active Tab للكحلي المشرق المتناسق بالصورة */
    .nav-item.active {
      background-color: #1e3a8a !important;
      color: #ffffff !important;
      border-radius: 8px !important;
    }
    .nav-item.active span { color: #ffffff !important; }

    /* مساحة العرض الرئيسية البيضاء النظيفة */
    main, .figma-main-content, .dashboard-viewport-render {
      background-color: #ffffff !important;
    }

    .platform-container {
      display: flex !important;
      width: 100vw !important;
      height: 100vh !important;
      overflow: hidden !important;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  isArabic = false;
  userEmail = 'Loading Profile...';
  userPhone = 'Fetching Role...';

  ngOnInit() {
    const savedEmail = localStorage.getItem('username');
    const savedPhone = localStorage.getItem('userphone');
    if (savedEmail) this.userEmail = savedEmail;
    if (savedPhone) this.userPhone = savedPhone;
  }
}
