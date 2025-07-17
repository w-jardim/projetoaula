import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../core/auth/auth';
import { NotificationService } from '../../core/notification/notification';
import { ThemeService } from '../../core/theme/theme';

@Component({
  selector: 'app-forgot-password',
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
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private themeService = inject(ThemeService);

  forgotForm!: FormGroup;
  isLoading = false;
  emailSent = false;
  currentTheme$ = this.themeService.currentTheme$;

  ngOnInit(): void {
    this.initializeForm();
    this.checkIfAuthenticated();
  }

  private initializeForm(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private checkIfAuthenticated(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const email = this.forgotForm.get('email')?.value;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.emailSent = true;
        this.notificationService.showSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.handleError(error);
      }
    });
  }

  onResendEmail(): void {
    this.emailSent = false;
    this.onSubmit();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Getters para validação
  get emailControl() { return this.forgotForm.get('email'); }

  get isEmailInvalid(): boolean {
    const email = this.emailControl;
    return !!(email && email.invalid && (email.dirty || email.touched));
  }

  get emailErrorMessage(): string {
    const email = this.emailControl;
    if (email?.hasError('required')) return 'Email é obrigatório';
    if (email?.hasError('email')) return 'Email inválido';
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotForm.controls).forEach(key => {
      const control = this.forgotForm.get(key);
      control?.markAsTouched();
    });
  }

  private handleError(error: any): void {
    let message = 'Erro ao enviar email. Tente novamente.';
    
    if (error.status === 404) {
      message = 'Email não encontrado. Verifique o endereço informado.';
    } else if (error.status === 429) {
      message = 'Muitas tentativas. Aguarde alguns minutos.';
    } else if (error.status === 0) {
      message = 'Erro de conexão. Verifique sua internet.';
    }
    
    this.notificationService.showError(message);
  }
}
