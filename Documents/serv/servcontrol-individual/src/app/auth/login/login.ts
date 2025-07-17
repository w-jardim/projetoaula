import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../core/auth/auth';
import { NotificationService } from '../../core/notification/notification';
import { ThemeService } from '../../core/theme/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private themeService = inject(ThemeService);

  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  currentTheme$ = this.themeService.currentTheme$;

  ngOnInit(): void {
    this.initializeForm();
    this.checkIfAlreadyAuthenticated();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Auto-fill para desenvolvimento (remover em produção)
    if (!this.isProduction()) {
      this.loginForm.patchValue({
        email: 'admin@servcontrol.com',
        password: '123456'
      });
    }
  }

  private checkIfAlreadyAuthenticated(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Login realizado com sucesso!');
        
        // Redirecionar baseado no retorno ou para dashboard
        const returnUrl = this.getReturnUrl();
        this.router.navigate([returnUrl]);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.handleLoginError(error);
      }
    });
  }

  onGoogleLogin(): void {
    this.isLoading = true;
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Login com Google realizado!');
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notificationService.showError('Erro no login com Google');
      }
    });
  }

  onForgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email && this.isValidEmail(email)) {
      this.router.navigate(['/auth/forgot-password'], {
        queryParams: { email }
      });
    } else {
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Getters para validação no template
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get isEmailInvalid(): boolean {
    const email = this.emailControl;
    return !!(email && email.invalid && (email.dirty || email.touched));
  }

  get isPasswordInvalid(): boolean {
    const password = this.passwordControl;
    return !!(password && password.invalid && (password.dirty || password.touched));
  }

  get emailErrorMessage(): string {
    const email = this.emailControl;
    if (email?.hasError('required')) {
      return 'Email é obrigatório';
    }
    if (email?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }

  get passwordErrorMessage(): string {
    const password = this.passwordControl;
    if (password?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (password?.hasError('minlength')) {
      return 'Senha deve ter pelo menos 6 caracteres';
    }
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private handleLoginError(error: any): void {
    let message = 'Erro no login. Tente novamente.';
    
    if (error.status === 401) {
      message = 'Email ou senha incorretos.';
    } else if (error.status === 429) {
      message = 'Muitas tentativas. Tente novamente em alguns minutos.';
    } else if (error.status === 0) {
      message = 'Erro de conexão. Verifique sua internet.';
    }
    
    this.notificationService.showError(message);
  }

  private getReturnUrl(): string {
    return '/dashboard'; // TODO: Implementar returnUrl dos query params
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isProduction(): boolean {
    return false; // TODO: Usar environment.production
  }
}
