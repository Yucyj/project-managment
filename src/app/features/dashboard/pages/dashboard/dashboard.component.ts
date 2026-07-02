import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; background-color: #f3f4f6; margin: 0;">
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); text-align: center; max-width: 450px; width: 100%; box-sizing: border-box;">
        <div style="width: 60px; height: 60px; background: #0066ff; color: white; font-size: 24px; font-weight: bold; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-family: 'Times New Roman', serif;">PS</div>
        <h1 style="color: #111827; margin: 0 0 8px 0; font-size: 26px; font-weight: 800;">Login Verified! 🎉</h1>
        <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 14px;">Successfully navigated to <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">dashboard/index</code></p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: start;">
          <h3 style="margin: 0 0 15px 0; color: #334155; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">📊 Live API Response Data:</h3>
          <div style="margin-bottom: 12px;">
            <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">User Email</span>
            <span style="font-size: 15px; color: #0f172a; font-weight: 600;">{{ userEmail }}</span>
          </div>
          <div>
            <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Registered Phone</span>
            <span style="font-size: 15px; color: #0f172a; font-weight: 600;">{{ userPhone }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userEmail = 'no@example.com';
  userPhone = '0673243';

  ngOnInit() {
    const savedEmail = localStorage.getItem('username');
    const savedPhone = localStorage.getItem('userphone');
    if (savedEmail) this.userEmail = savedEmail;
    if (savedPhone) this.userPhone = savedPhone;
  }
}
