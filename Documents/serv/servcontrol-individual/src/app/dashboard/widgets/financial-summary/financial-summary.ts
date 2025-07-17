import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

interface FinancialData {
  currentMonth: {
    income: number;
    expenses: number;
    goal: number;
    services: number;
  };
  lastMonth: {
    income: number;
    expenses: number;
  };
}

@Component({
  selector: 'app-financial-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './financial-summary.html',
  styleUrl: './financial-summary.scss'
})
export class FinancialSummaryComponent implements OnInit {
  
  financialData: FinancialData = {
    currentMonth: {
      income: 4250.00,
      expenses: 850.00,
      goal: 5000.00,
      services: 12
    },
    lastMonth: {
      income: 3800.00,
      expenses: 920.00
    }
  };

  ngOnInit(): void {
    // Simular carregamento de dados
  }

  get netIncome(): number {
    return this.financialData.currentMonth.income - this.financialData.currentMonth.expenses;
  }

  get goalProgress(): number {
    return (this.financialData.currentMonth.income / this.financialData.currentMonth.goal) * 100;
  }

  get incomeGrowth(): number {
    const current = this.financialData.currentMonth.income;
    const last = this.financialData.lastMonth.income;
    return ((current - last) / last) * 100;
  }

  get expenseGrowth(): number {
    const current = this.financialData.currentMonth.expenses;
    const last = this.financialData.lastMonth.expenses;
    return ((current - last) / last) * 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
