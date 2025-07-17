import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage';

export type Theme = 'militar' | 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'selected_theme';
  private currentThemeSubject = new BehaviorSubject<Theme>('militar');

  constructor(private localStorage: LocalStorageService) {
    this.loadSavedTheme();
  }

  public currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();

  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    this.localStorage.setItem(this.THEME_KEY, theme);
    this.applyThemeToDocument(theme);
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  loadSavedTheme(): void {
    const savedTheme = this.localStorage.getItem<Theme>(this.THEME_KEY);
    const theme = savedTheme || 'militar';
    this.setTheme(theme);
  }

  toggleTheme(): void {
    const current = this.getCurrentTheme();
    let next: Theme;
    
    switch (current) {
      case 'militar':
        next = 'dark';
        break;
      case 'dark':
        next = 'light';
        break;
      case 'light':
        next = 'militar';
        break;
      default:
        next = 'militar';
    }
    
    this.setTheme(next);
  }

  private applyThemeToDocument(theme: Theme): void {
    const body = document.body;
    body.classList.remove('militar-theme', 'dark-theme', 'light-theme');
    body.classList.add(`${theme}-theme`);
  }

  getThemeColors(): { primary: string; accent: string; background: string } {
    const theme = this.getCurrentTheme();
    
    switch (theme) {
      case 'militar':
        return { primary: '#2E7D32', accent: '#FFC107', background: '#F5F5F5' };
      case 'dark':
        return { primary: '#BB86FC', accent: '#03DAC6', background: '#121212' };
      case 'light':
        return { primary: '#1976D2', accent: '#FF5722', background: '#FFFFFF' };
      default:
        return { primary: '#2E7D32', accent: '#FFC107', background: '#F5F5F5' };
    }
  }
}
