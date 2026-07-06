import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'app_language';
  private readonly languageState = signal<AppLanguage>(this.getSavedLanguage());

  readonly currentLanguage = this.languageState.asReadonly();

  constructor() {
    this.applyLanguage(this.languageState());
  }

  getCurrentLanguage(): AppLanguage {
    return this.languageState();
  }

  setCurrentLanguage(language: AppLanguage): void {
    localStorage.setItem(this.storageKey, language);
    this.languageState.set(language);
    this.applyLanguage(language);
  }

  toggleLanguage(): void {
    const nextLanguage: AppLanguage = this.languageState() === 'ar' ? 'en' : 'ar';
    this.setCurrentLanguage(nextLanguage);
  }

  private getSavedLanguage(): AppLanguage {
    const language = localStorage.getItem(this.storageKey);

    if (language === 'ar' || language === 'en') {
      return language;
    }

    return 'en';
  }

  private applyLanguage(language: AppLanguage): void {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
}