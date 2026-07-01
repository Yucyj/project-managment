import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Essential token to activate route viewports
  template: `<router-outlet></router-outlet>` // This is the placeholder where your login page will render
})
export class AppComponent {}
