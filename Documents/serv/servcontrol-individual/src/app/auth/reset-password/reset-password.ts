import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../core/auth/auth';
import { NotificationService } from '../../core/notification/notification';
import { ThemeService } from '../../core/theme/theme';

@Component({
  selector: 'app-reset-password',
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
    MatTooltipModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private themeService = inject(ThemeService);

  resetForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  resetToken = '';
  currentTheme$ = this.themeService.currentTheme$;

  ngOnInit(): void {
    this.getResetToken();
    this.initializeForm();
    this.checkIfAuthenticated();
  }

  private getResetToken(): void {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'] || '';
      if (!this.resetToken) {
        this.notificationService.showError('Token de reset inválido');
        this.router.navigate(['/auth/forgot-password']);
      }
    });
  }

  private initializeForm(): void {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator 
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
    if (this.resetForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const newPassword = this.resetForm.get('password')?.value;

    this.authService.resetPassword(this.resetToken, newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Senha redefinida com sucesso! Faça login com sua nova senha.');
        this.router.navigate(['/auth/login']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.handleError(error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Validators customizados
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    return valid ? null : { weakPassword: true };
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Getters para validação
  get passwordControl() { return this.resetForm.get('password'); }
  get confirmPasswordControl() { return this.resetForm.get('confirmPassword'); }

  get isPasswordInvalid(): boolean {
    const password = this.passwordControl;
    return !!(password && password.invalid && (password.dirty || password.touched));
  }

  get isConfirmPasswordInvalid(): boolean {
    const confirmPassword = this.confirmPasswordControl;
    const hasError = confirmPassword && confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched);
    const mismatch = this.resetForm.hasError('passwordMismatch') && confirmPassword?.touched;
    return !!(hasError || mismatch);
  }

  get passwordErrorMessage(): string {
    const password = this.passwordControl;
    if (password?.hasError('required')) return 'Senha é obrigatória';
    if (password?.hasError('minlength')) return 'Senha deve ter pelo menos 8 caracteres';
    if (password?.hasError('weakPassword')) return 'Senha deve conter maiúscula, minúscula, número e símbolo';
    return '';
  }

  get confirmPasswordErrorMessage(): string {
    const confirmPassword = this.confirmPasswordControl;
    if (confirmPassword?.hasError('required')) return 'Confirmação de senha é obrigatória';
    if (this.resetForm.hasError('passwordMismatch')) return 'Senhas não coincidem';
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.resetForm.controls).forEach(key => {
      const control = this.resetForm.get(key);
      control?.markAsTouched();
    });
  }

  private handleError(error: any): void {
    let message = 'Erro ao redefinir senha. Tente novamente.';
    
    if (error.status === 400) {
      message = 'Token expirado ou inválido. Solicite um novo reset.';
    } else if (error.status === 404) {
      message = 'Token não encontrado. Solicite um novo reset.';
    } else if (error.status === 0) {
      message = 'Erro de conexão. Verifique sua internet.';
    }
    
    this.notificationService.showError(message);
  }
}
