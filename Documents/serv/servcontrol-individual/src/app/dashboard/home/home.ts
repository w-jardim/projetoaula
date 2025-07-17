import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

import { StatsCardComponent, StatData } from '../widgets/stats-card/stats-card';
import { FinancialSummaryComponent } from '../widgets/financial-summary/financial-summary';
import { QuickActionsComponent } from '../widgets/quick-actions/quick-actions';
import { RecentServicesComponent } from '../widgets/recent-services/recent-services';
import { MonthlyChartComponent } from '../widgets/monthly-chart/monthly-chart';
import { ThemeService } from '../../core/theme/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    StatsCardComponent,
    FinancialSummaryComponent,
    QuickActionsComponent,
    RecentServicesComponent,
    MonthlyChartComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;

  // Observável para responsividade
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(map(result => result.matches));

  // Grid configuration based on screen size
  cols$: Observable<number> = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
    map(result => {
      if (result.breakpoints[Breakpoints.XSmall]) return 1;
      if (result.breakpoints[Breakpoints.Small]) return 2;
      if (result.breakpoints[Breakpoints.Medium]) return 3;
      return 4;
    })
  );

  // Dados de exemplo para o dashboard
  dashboardStats: StatData[] = [
    {
      title: 'Escalas Este Mês',
      value: 18,
      icon: 'security',
      color: 'primary',
      trend: +3,
      subtitle: '3 a mais que mês passado'
    },
    {
      title: 'Receita Total',
      value: 'R$ 6.750',
      icon: 'account_balance_wallet',
      color: 'accent',
      trend: +15,
      subtitle: 'Crescimento de 15%'
    },
    {
      title: 'Plantões Agendados',
      value: 7,
      icon: 'schedule',
      color: 'primary',
      trend: 0,
      subtitle: 'Próximos 7 dias'
    },
    {
      title: 'Valor por Hora',
      value: 'R$ 25,00',
      icon: 'trending_up',
      color: 'accent',
      trend: +5,
      subtitle: 'Média por plantão'
    }
  ];

  ngOnInit(): void {
    // Inicialização do componente
    console.log('Dashboard Home initialized');
  }

  onQuickAction(action: string): void {
    console.log('Quick action triggered:', action);
    // TODO: Implementar navegação para ações rápidas
  }
}
