import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <a [routerLink]="['/dashboard']" class="btn-home">
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
    }
    
    .content {
      text-align: center;
      padding: 2rem;
    }
    
    h1 {
      font-size: 6rem;
      margin: 0;
      color: #2c5530;
      font-weight: bold;
    }
    
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
      color: #666;
    }
    
    p {
      color: #888;
      margin-bottom: 2rem;
    }
    
    .btn-home {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #2c5530;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .btn-home:hover {
      background: #1e3a21;
    }
  `]
})
export class NotFound {

}
