import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
  description: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss'
})
export class QuickActionsComponent {
  @Output() actionClick = new EventEmitter<string>();

  actions: QuickAction[] = [
    {
      id: 'new-escala',
      label: 'Nova Escala',
      icon: 'add_circle',
      color: 'primary',
      description: 'Cadastrar nova escala de trabalho'
    },
    {
      id: 'start-plantao',
      label: 'Iniciar Plantão',
      icon: 'play_circle',
      color: 'accent',
      description: 'Marcar início do plantão'
    },
    {
      id: 'view-calendar',
      label: 'Calendário',
      icon: 'calendar_today',
      color: 'primary',
      description: 'Ver escalas do mês'
    },
    {
      id: 'swap-shift',
      label: 'Trocar Plantão',
      icon: 'swap_horiz',
      color: 'warn',
      description: 'Solicitar troca de plantão'
    },
    {
      id: 'financial-report',
      label: 'Relatório',
      icon: 'assessment',
      color: 'accent',
      description: 'Gerar relatório mensal'
    },
    {
      id: 'my-profile',
      label: 'Meu Perfil',
      icon: 'account_circle',
      color: 'primary',
      description: 'Editar informações pessoais'
    }
  ];

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
