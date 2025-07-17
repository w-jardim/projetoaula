import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoadingComponent } from './layout/loading/loading';
import { AuthService } from './core/auth/auth';
import { ThemeService } from './core/theme/theme';
import { NotificationService } from './core/notification/notification';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressBarModule,
    LoadingComponent
  ],
  template: `
    <div class="app-container" [class]="currentTheme + '-theme'">
      <!-- Loading Global -->
      <app-loading></app-loading>
      
      <!-- Router Outlet Principal -->
      <router-outlet></router-outlet>
      
      <!-- Toast/Snackbar será injetado aqui pelo NotificationService -->
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private notificationService = inject(NotificationService);
  private loadingService = inject(LoadingService);

  title = 'ServControl Individual';
  currentTheme = 'militar';
  isLoading$ = this.loadingService.isLoading$;

  ngOnInit() {
    // Inicializar tema
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Verificar estado de autenticação
    this.authService.checkAuthState();

    // Configurar notificações
    this.notificationService.initialize();

    // Log de inicialização
    console.log('🚀 ServControl Individual inicializado!');
  }
}
