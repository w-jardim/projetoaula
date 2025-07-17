import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { ThemeService } from '../../core/theme/theme';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  @Input() isHandset = false;

  private themeService = inject(ThemeService);
  currentTheme$ = this.themeService.currentTheme$;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Escalas',
      icon: 'security',
      children: [
        { label: 'Minhas Escalas', icon: 'list', route: '/services' },
        { label: 'Nova Escala', icon: 'add', route: '/services/new' },
        { label: 'Calendário', icon: 'calendar_today', route: '/services/calendar' }
      ]
    },
    {
      label: 'Plantões',
      icon: 'shield',
      children: [
        { label: 'Plantão Ativo', icon: 'play_circle', route: '/plantoes/ativo' },
        { label: 'Histórico', icon: 'history', route: '/plantoes/historico' },
        { label: 'Trocas', icon: 'swap_horiz', route: '/plantoes/trocas' }
      ]
    },
    {
      label: 'Financeiro',
      icon: 'account_balance',
      children: [
        { label: 'Resumo Mensal', icon: 'account_balance_wallet', route: '/financial' },
        { label: 'Pagamentos', icon: 'payment', route: '/financial/payments' },
        { label: 'Relatórios', icon: 'bar_chart', route: '/financial/reports' },
        { label: 'Projeções', icon: 'trending_up', route: '/financial/projections' }
      ]
    },
    {
      label: 'Relatórios',
      icon: 'assessment',
      children: [
        { label: 'Horas Trabalhadas', icon: 'access_time', route: '/reports/horas' },
        { label: 'Eficiência', icon: 'trending_up', route: '/reports/eficiencia' },
        { label: 'Gerar Relatório', icon: 'description', route: '/reports/generate' }
      ]
    },
    {
      label: 'Perfil',
      icon: 'person',
      children: [
        { label: 'Meu Perfil', icon: 'account_circle', route: '/profile' },
        { label: 'Documentos', icon: 'folder', route: '/profile/documentos' },
        { label: 'Configurações', icon: 'settings', route: '/profile/settings' }
      ]
    }
  ];
}
