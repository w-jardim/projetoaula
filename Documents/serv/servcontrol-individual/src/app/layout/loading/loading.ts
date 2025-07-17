import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-overlay" *ngIf="isLoading$ | async">
      <div class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p class="loading-text">Carregando...</p>
      </div>
    </div>
  `,
  styleUrls: ['./loading.scss']
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;
}
