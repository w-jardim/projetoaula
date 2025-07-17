import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem<string>('auth_token');

  // Se não há token, prosseguir sem modificar a requisição
  if (!token) {
    return next(req);
  }

  // Clonar a requisição e adicionar o header de autorização
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(authReq);
};
