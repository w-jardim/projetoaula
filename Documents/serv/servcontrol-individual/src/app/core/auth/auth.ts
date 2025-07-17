import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../storage/local-storage';

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.checkAuthState();
  }

  checkAuthState(): void {
    const token = this.localStorage.getItem<string>('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<LoginResponse> {
    // Simulação de login para desenvolvimento
    return of({ email, password }).pipe(
      delay(1500), // Simula delay da API
      switchMap(() => {
        // Validação simples para desenvolvimento
        if (email === 'admin@servcontrol.com' && password === '123456') {
          const token = this.generateMockToken();
          const user = {
            id: '1',
            email: email,
            name: 'Administrador'
          };

          // Salvar token
          this.localStorage.setItem('auth_token', token);
          if (rememberMe) {
            this.localStorage.setItem('remember_me', true);
          }

          // Atualizar estado
          this.isAuthenticatedSubject.next(true);

          return of({
            success: true,
            token,
            user,
            message: 'Login realizado com sucesso'
          });
        } else {
          return throwError(() => ({
            status: 401,
            message: 'Credenciais inválidas'
          }));
        }
      })
    );
  }

  loginWithGoogle(): Observable<LoginResponse> {
    // TODO: Implementar login com Google/Supabase
    return of(null).pipe(
      delay(1000),
      switchMap(() => {
        // Por enquanto, simula sucesso
        const token = this.generateMockToken();
        const user = {
          id: '2',
          email: 'user@google.com',
          name: 'Usuário Google'
        };

        this.localStorage.setItem('auth_token', token);
        this.isAuthenticatedSubject.next(true);

        return of({
          success: true,
          token,
          user,
          message: 'Login com Google realizado'
        });
      })
    );
  }

  logout(): void {
    this.localStorage.removeItem('auth_token');
    this.localStorage.removeItem('remember_me');
    this.localStorage.removeItem('user_data');
    this.isAuthenticatedSubject.next(false);
  }

  forgotPassword(email: string): Observable<{success: boolean; message: string}> {
    // TODO: Implementar reset de senha
    return of(null).pipe(
      delay(1000),
      switchMap(() => of({
        success: true,
        message: 'Email de recuperação enviado'
      }))
    );
  }

  resetPassword(token: string, newPassword: string): Observable<{success: boolean; message: string}> {
    // TODO: Implementar reset de senha
    return of(null).pipe(
      delay(1000),
      switchMap(() => of({
        success: true,
        message: 'Senha alterada com sucesso'
      }))
    );
  }

  register(userData: {name: string; email: string; password: string}): Observable<LoginResponse> {
    // TODO: Implementar registro
    return of(null).pipe(
      delay(1500),
      switchMap(() => {
        const token = this.generateMockToken();
        const user = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name
        };

        this.localStorage.setItem('auth_token', token);
        this.isAuthenticatedSubject.next(true);

        return of({
          success: true,
          token,
          user,
          message: 'Conta criada com sucesso'
        });
      })
    );
  }

  getCurrentUser(): Observable<any> {
    // TODO: Buscar dados do usuário atual
    const userData = this.localStorage.getItem('user_data');
    return of(userData);
  }

  private generateMockToken(): string {
    return 'mock_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
