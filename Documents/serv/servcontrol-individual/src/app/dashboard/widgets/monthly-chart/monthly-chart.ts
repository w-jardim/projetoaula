import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ChartData {
  month: string;
  earnings: number;
  services: number;
}

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './monthly-chart.html',
  styleUrl: './monthly-chart.scss'
})
export class MonthlyChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  chartData: ChartData[] = [
    { month: 'Jan', earnings: 2500, services: 8 },
    { month: 'Fev', earnings: 3200, services: 12 },
    { month: 'Mar', earnings: 2800, services: 10 },
    { month: 'Abr', earnings: 3800, services: 15 },
    { month: 'Mai', earnings: 4200, services: 18 },
    { month: 'Jun', earnings: 3600, services: 14 }
  ];

  selectedYear = 2025;
  availableYears = [2023, 2024, 2025];

  maxEarnings = 0;
  maxServices = 0;

  ngOnInit(): void {
    this.calculateMaxValues();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  calculateMaxValues(): void {
    this.maxEarnings = Math.max(...this.chartData.map(d => d.earnings));
    this.maxServices = Math.max(...this.chartData.map(d => d.services));
  }

  drawChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    const barWidth = chartWidth / this.chartData.length;
    for (let i = 0; i <= this.chartData.length; i++) {
      const x = padding + barWidth * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw bars and line
    this.drawBars(ctx, padding, chartWidth, chartHeight);
    this.drawLine(ctx, padding, chartWidth, chartHeight);
    this.drawLabels(ctx, padding, chartWidth, chartHeight, barWidth);
  }

  drawBars(ctx: CanvasRenderingContext2D, padding: number, chartWidth: number, chartHeight: number): void {
    const barWidth = chartWidth / this.chartData.length;
    const actualBarWidth = barWidth * 0.6;
    const barOffset = (barWidth - actualBarWidth) / 2;

    ctx.fillStyle = '#3f51b5';

    this.chartData.forEach((data, index) => {
      const barHeight = (data.earnings / this.maxEarnings) * chartHeight;
      const x = padding + (barWidth * index) + barOffset;
      const y = padding + chartHeight - barHeight;

      ctx.fillRect(x, y, actualBarWidth, barHeight);
    });
  }

  drawLine(ctx: CanvasRenderingContext2D, padding: number, chartWidth: number, chartHeight: number): void {
    const barWidth = chartWidth / this.chartData.length;
    
    ctx.strokeStyle = '#ff5722';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    this.chartData.forEach((data, index) => {
      const x = padding + (barWidth * index) + (barWidth / 2);
      const y = padding + chartHeight - ((data.services / this.maxServices) * chartHeight);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw circle points
      ctx.save();
      ctx.fillStyle = '#ff5722';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    });
    ctx.stroke();
  }

  drawLabels(ctx: CanvasRenderingContext2D, padding: number, chartWidth: number, chartHeight: number, barWidth: number): void {
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Month labels
    this.chartData.forEach((data, index) => {
      const x = padding + (barWidth * index) + (barWidth / 2);
      const y = padding + chartHeight + 20;
      ctx.fillText(data.month, x, y);
    });

    // Y-axis labels (earnings)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (this.maxEarnings / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(this.formatCurrency(value), padding - 10, y);
    }

    // Y-axis labels (services) - right side
    ctx.textAlign = 'left';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((this.maxServices / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(value.toString(), padding + chartWidth + 10, y);
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  onYearChange(): void {
    // Simulate loading new data for selected year
    this.loadDataForYear(this.selectedYear);
  }

  loadDataForYear(year: number): void {
    // Simulate API call with different data based on year
    setTimeout(() => {
      this.chartData = this.generateMockData(year);
      this.calculateMaxValues();
      this.drawChart();
    }, 100);
  }

  generateMockData(year: number): ChartData[] {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    return months.map(month => ({
      month,
      earnings: Math.floor(Math.random() * 2000) + 2000, // 2000-4000
      services: Math.floor(Math.random() * 10) + 8 // 8-18
    }));
  }

  getTotalEarnings(): number {
    return this.chartData.reduce((acc, curr) => acc + curr.earnings, 0);
  }

  getTotalServices(): number {
    return this.chartData.reduce((acc, curr) => acc + curr.services, 0);
  }

  getAverageEarnings(): number {
    return this.getTotalEarnings() / this.chartData.length;
  }
}
