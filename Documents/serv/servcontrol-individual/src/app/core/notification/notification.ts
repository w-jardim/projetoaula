import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private snackBar: MatSnackBar) { }

  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  initialize(): void {
    console.log('NotificationService inicializado');
  }

  showSuccess(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string, duration: number = 6000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['error-snackbar']
    });
  }

  showWarning(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['warning-snackbar']
    });
  }

  showInfo(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['info-snackbar']
    });
  }

  dismissAll(): void {
    this.snackBar.dismiss();
  }
}
