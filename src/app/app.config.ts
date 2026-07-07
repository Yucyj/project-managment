import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🚀 الحل المعماري القاطع: تفعيل الـ Zone التقليدي المتوافق مع جهازك لكسر الشلل وإنهاء البياض فوراً
    provideRouter(routes),
    provideHttpClient() 
  ]
};
