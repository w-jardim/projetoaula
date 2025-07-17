import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  /**
   * Observable para verificar o estado de loading
   */
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Mostra o loading
   */
  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Esconde o loading
   */
  hide(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Força o reset do loading (usar com cuidado)
   */
  reset(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }

  /**
   * Verifica se está carregando
   */
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
