import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  graduation?: string;
  unit?: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  /**
   * Verifica se o perfil do usuário está completo
   */
  isProfileComplete(): Observable<boolean> {
    // TODO: Implementar verificação real com Supabase
    // Por enquanto, retorna true para desenvolvimento
    return of(true);
  }

  /**
   * Obtém o perfil do usuário atual
   */
  getCurrentProfile(): Observable<UserProfile | null> {
    // TODO: Implementar busca real do perfil
    return of(null);
  }

  /**
   * Atualiza o perfil do usuário
   */
  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    // TODO: Implementar atualização real
    return of({} as UserProfile);
  }

  /**
   * Verifica se os campos obrigatórios estão preenchidos
   */
  private validateRequiredFields(profile: UserProfile): boolean {
    return !!(profile.name && profile.email && profile.cpf && profile.phone);
  }
}
