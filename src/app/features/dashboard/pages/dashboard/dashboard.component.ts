import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 🔍 Horizontal Search & Header Utility Create Block -->
    <div class="search-and-action-row">
      <div class="search-input-box">
        <span class="search-lens">🔍</span>
        <input type="text" placeholder="Search for everything" />
      </div>
      <button class="action-create-btn" type="button">+ Crete New</button>
    </div>

    <!-- 📊 Summary Metric Block Parameter Cards Grid -->
    <div class="cards-summary-grid">
      <div class="metric-card">
        <span class="card-label-text">Total Portfolio</span>
        <div class="card-data-line">
          <!-- Portfolio Folder SVG Graphic Shape Descriptor -->
          <svg class="card-svg-icon yellow" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <div class="metric-card">
        <span class="card-label-text">Total Programs</span>
        <div class="card-data-line">
          <!-- Program Block Component SVG Frame Graph -->
          <svg class="card-svg-icon brown" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22 8.5c0-.83-.67-1.5-1.5-1.5H3.5C2.67 7 2 7.67 2 8.5v11c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-11zM18 19H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V9h12v2zM12 2L2 6l10 4 10-4-10-4z"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <div class="metric-card">
        <span class="card-label-text">Total Projects</span>
        <div class="card-data-line">
          <!-- Project Document Blueprint SVG Component -->
          <svg class="card-svg-icon blue" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          <strong class="card-value-text">0</strong>
        </div>
      </div>
      
      <div class="metric-card">
        <span class="card-label-text">Total Budget</span>
        <div class="card-data-line">
          <!-- Coin Currency Financial Parameter Icon Shape -->
          <svg class="card-svg-icon orange" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg>
          <strong class="card-value-text">00</strong>
        </div>
      </div>
    </div>

    <!-- 📭 Center Empty State Graphic Screen Canvas Component -->
    <div class="center-empty-state-container">
      <div class="art-empty-circle-frame">
        <div class="empty-vector-art">
          <!-- Structural Graphic Design elements wrapping the center canvas -->
          <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="12" cy="14" r="3"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
        </div>
      </div>
      <h3 class="empty-state-heading">No data right now</h3>
      <p class="empty-state-paragraph">Please click on <strong>create new</strong> to choose the sutible option</p>
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
      width: 600px;
      height: 44px;
      box-sizing: border-box;
    }

    .search-lens {
      color: #94a3b8;
      font-size: 15px;
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
      background-color: #0e1e38;
      color: #ffffff;
      border: none;
      border-radius: 24px;
      padding: 0 36px;
      height: 44px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(14, 30, 56, 0.15);
      transition: background 0.2s;
    }

    .action-create-btn:hover { background-color: #1a2e4c; }

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

    .card-label-text {
      font-size: 13px;
      color: #1e293b;
      font-weight: 700;
      display: block;
      margin-bottom: 10px;
    }

    .card-data-line {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .card-svg-icon { display: flex; align-items: center; }
    .card-svg-icon.yellow { color: #f59e0b; }
    .card-svg-icon.brown { color: #8b5cf6; }
    .card-svg-icon.blue { color: #3b82f6; }
    .card-svg-icon.orange { color: #f97316; }

    .card-value-text {
      font-size: 24px;
      font-weight: 800;
      color: #0e1e38;
    }

    /* Centered Empty State circle graphic setup */
    .center-empty-state-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 40px;
    }

    .art-empty-circle-frame {
      width: 110px;
      height: 110px;
      background-color: #e6f0fa;
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
      color: #0e1e38;
      margin: 0 0 8px 0;
    }

    .empty-state-paragraph {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    
    .empty-state-paragraph strong { color: #0e1e38; }
  `]
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}
}
