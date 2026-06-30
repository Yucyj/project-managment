import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
        <h1 style="color: #111827; margin: 0 0 10px 0;">Welcome Back, <span style="color: #0066ff; font-weight: bold;">{{ loggedInUser }}</span>! 👋</h1>
        <p style="color: #6b7280; margin: 0;">Successfully redirected to dashboard/index</p>
      </div>
    </div>
  `
})
// Adding the 'export' keyword turns this file into an importable module
export class DashboardComponent implements OnInit {
  loggedInUser = 'no@example.com';

  ngOnInit() {
    // Dynamically captures the verified credentials data stored in the local cache
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.loggedInUser = savedUser;
    }
  }
}
