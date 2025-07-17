import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface StatData {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
  trend?: number;
  subtitle?: string;
}

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCardComponent {
  @Input() data!: StatData;
  @Input() loading = false;

  get trendColor(): string {
    if (!this.data.trend || this.data.trend === 0) return 'neutral';
    return this.data.trend > 0 ? 'positive' : 'negative';
  }

  get trendIcon(): string {
    if (!this.data.trend || this.data.trend === 0) return 'remove';
    return this.data.trend > 0 ? 'trending_up' : 'trending_down';
  }
}
