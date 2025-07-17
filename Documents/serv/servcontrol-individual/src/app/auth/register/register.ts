import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { AuthService } from '../../core/auth/auth';
import { NotificationService } from '../../core/notification/notification';
import { ThemeService } from '../../core/theme/theme';

@Component({
  selector: 'app-register',
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
    MatTooltipModule,
    MatSelectModule,
    MatStepperModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private themeService = inject(ThemeService);

  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  currentTheme$ = this.themeService.currentTheme$;
  
  // Opções para seleção
  graduationOptions = [
    { value: 'soldado', label: 'Soldado' },
    { value: 'cabo', label: 'Cabo' },
    { value: 'sargento', label: 'Sargento' },
    { value: 'subtenente', label: 'Subtenente' },
    { value: 'tenente', label: 'Tenente' },
    { value: 'capitao', label: 'Capitão' },
    { value: 'major', label: 'Major' },
    { value: 'coronel', label: 'Coronel' }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.checkIfAlreadyAuthenticated();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      // Dados pessoais
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      
      // Dados profissionais
      graduation: ['', [Validators.required]],
      unit: ['', [Validators.required, Validators.minLength(3)]],
      
      // Credenciais
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      
      // Termos
      acceptTerms: [false, [Validators.requiredTrue]],
      acceptPrivacy: [false, [Validators.requiredTrue]],
      receiveNotifications: [true]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  private checkIfAlreadyAuthenticated(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const userData = this.registerForm.value;
    
    // Remove confirmPassword antes de enviar
    delete userData.confirmPassword;

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Conta criada com sucesso! Bem-vindo!');
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.handleRegisterError(error);
      }
    });
  }

  onGoogleRegister(): void {
    this.isLoading = true;
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Conta criada com Google!');
        this.router.navigate(['/profile/edit'], {
          queryParams: { complete: 'true' }
        });
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notificationService.showError('Erro no cadastro com Google');
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
  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/\D/g, '');
    if (!cpf || cpf.length !== 11) {
      return { invalidCpf: true };
    }
    
    // Validação básica de CPF (implementar lógica completa depois)
    if (cpf === '00000000000' || cpf === '11111111111') {
      return { invalidCpf: true };
    }
    
    return null;
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value?.replace(/\D/g, '');
    if (!phone || (phone.length !== 10 && phone.length !== 11)) {
      return { invalidPhone: true };
    }
    return null;
  }

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

  // Getters para validação no template
  get nameControl() { return this.registerForm.get('name'); }
  get emailControl() { return this.registerForm.get('email'); }
  get cpfControl() { return this.registerForm.get('cpf'); }
  get phoneControl() { return this.registerForm.get('phone'); }
  get graduationControl() { return this.registerForm.get('graduation'); }
  get unitControl() { return this.registerForm.get('unit'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
  get acceptTermsControl() { return this.registerForm.get('acceptTerms'); }

  // Validação de erro helpers
  get isNameInvalid(): boolean {
    const name = this.nameControl;
    return !!(name && name.invalid && (name.dirty || name.touched));
  }

  get isEmailInvalid(): boolean {
    const email = this.emailControl;
    return !!(email && email.invalid && (email.dirty || email.touched));
  }

  get isCpfInvalid(): boolean {
    const cpf = this.cpfControl;
    return !!(cpf && cpf.invalid && (cpf.dirty || cpf.touched));
  }

  get isPhoneInvalid(): boolean {
    const phone = this.phoneControl;
    return !!(phone && phone.invalid && (phone.dirty || phone.touched));
  }

  get isPasswordInvalid(): boolean {
    const password = this.passwordControl;
    return !!(password && password.invalid && (password.dirty || password.touched));
  }

  get isConfirmPasswordInvalid(): boolean {
    const confirmPassword = this.confirmPasswordControl;
    const hasError = confirmPassword && confirmPassword.invalid && (confirmPassword.dirty || confirmPassword.touched);
    const mismatch = this.registerForm.hasError('passwordMismatch') && confirmPassword?.touched;
    return !!(hasError || mismatch);
  }

  // Mensagens de erro
  get nameErrorMessage(): string {
    const name = this.nameControl;
    if (name?.hasError('required')) return 'Nome é obrigatório';
    if (name?.hasError('minlength')) return 'Nome deve ter pelo menos 2 caracteres';
    return '';
  }

  get emailErrorMessage(): string {
    const email = this.emailControl;
    if (email?.hasError('required')) return 'Email é obrigatório';
    if (email?.hasError('email')) return 'Email inválido';
    return '';
  }

  get cpfErrorMessage(): string {
    const cpf = this.cpfControl;
    if (cpf?.hasError('required')) return 'CPF é obrigatório';
    if (cpf?.hasError('invalidCpf')) return 'CPF inválido';
    return '';
  }

  get phoneErrorMessage(): string {
    const phone = this.phoneControl;
    if (phone?.hasError('required')) return 'Telefone é obrigatório';
    if (phone?.hasError('invalidPhone')) return 'Telefone inválido';
    return '';
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
    if (this.registerForm.hasError('passwordMismatch')) return 'Senhas não coincidem';
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  private handleRegisterError(error: any): void {
    let message = 'Erro no cadastro. Tente novamente.';
    
    if (error.status === 409) {
      message = 'Email já cadastrado. Use outro email ou faça login.';
    } else if (error.status === 400) {
      message = 'Dados inválidos. Verifique as informações.';
    } else if (error.status === 0) {
      message = 'Erro de conexão. Verifique sua internet.';
    }
    
    this.notificationService.showError(message);
  }
}
