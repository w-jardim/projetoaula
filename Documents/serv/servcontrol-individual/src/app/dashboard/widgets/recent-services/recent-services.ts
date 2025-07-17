import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

interface EscalaItem {
  id: string;
  titulo: string;
  local: string;
  data: Date;
  status: 'concluida' | 'agendada' | 'cancelada';
  valor: number;
  duracao: string;
  tipo: 'plantao' | 'ronda' | 'evento' | 'extra';
}

@Component({
  selector: 'app-recent-services',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule
  ],
  templateUrl: './recent-services.html',
  styleUrl: './recent-services.scss'
})
export class RecentServicesComponent implements OnInit {
  
  recentEscalas: EscalaItem[] = [
    {
      id: '1',
      titulo: 'Plantão Shopping Center',
      local: 'Shopping Center Norte - Segurança',
      data: new Date('2025-07-15'),
      status: 'concluida',
      valor: 200.00,
      duracao: '8h',
      tipo: 'plantao'
    },
    {
      id: '2',
      titulo: 'Escolta Evento Corporativo',
      local: 'Centro de Convenções - Sala A',
      data: new Date('2025-07-18'),
      status: 'agendada',
      valor: 350.00,
      duracao: '6h',
      tipo: 'evento'
    },
    {
      id: '3',
      titulo: 'Ronda Residencial',
      local: 'Condomínio Vila Rica - Portaria',
      data: new Date('2025-07-12'),
      status: 'concluida',
      valor: 180.00,
      duracao: '12h',
      tipo: 'ronda'
    },
    {
      id: '4',
      titulo: 'Plantão Extra Banco',
      local: 'Agência Banco Central - Setor 1',
      data: new Date('2025-07-10'),
      status: 'cancelada',
      valor: 280.00,
      duracao: '4h',
      tipo: 'extra'
    }
  ];

  ngOnInit(): void {
    // Ordenar por data (mais recentes primeiro)
    this.recentEscalas.sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'concluida': return 'accent';
      case 'agendada': return 'primary';
      case 'cancelada': return 'warn';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'concluida': return 'check_circle';
      case 'agendada': return 'schedule';
      case 'cancelada': return 'cancel';
      default: return 'help';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'concluida': return 'Concluída';
      case 'agendada': return 'Agendada';
      case 'cancelada': return 'Cancelada';
      default: return 'Desconhecido';
    }
  }

  getTipoLabel(tipo: string): string {
    switch (tipo) {
      case 'plantao': return 'Plantão';
      case 'ronda': return 'Ronda';
      case 'evento': return 'Evento';
      case 'extra': return 'Extra';
      default: return 'Outros';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
}
