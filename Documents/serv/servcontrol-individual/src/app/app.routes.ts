import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { profileCompleteGuard } from './core/guards/profile-complete-guard';

export const routes: Routes = [
  // Redirect inicial
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Rotas de autenticação (públicas)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.Login),
        title: 'ServControl - Login'
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register').then(m => m.Register),
        title: 'ServControl - Cadastro'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
        title: 'ServControl - Recuperar Senha'
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth/reset-password/reset-password').then(m => m.ResetPassword),
        title: 'ServControl - Nova Senha'
      }
    ]
  },

  // Rotas protegidas (requer autenticação)
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard, profileCompleteGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/home/home').then(m => m.Home),
        title: 'ServControl - Dashboard'
      }
    ]
  },

  // Perfil do usuário
  {
    path: 'profile',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./profile/profile-view/profile-view').then(m => m.ProfileView),
        title: 'ServControl - Meu Perfil'
      },
      {
        path: 'edit',
        loadComponent: () => import('./profile/profile-edit/profile-edit').then(m => m.ProfileEdit),
        title: 'ServControl - Editar Perfil'
      },
      {
        path: 'settings',
        loadComponent: () => import('./profile/settings/settings').then(m => m.Settings),
        title: 'ServControl - Configurações'
      }
    ]
  },

  // Serviços
  {
    path: 'services',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard, profileCompleteGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./services/services-list/services-list').then(m => m.ServicesList),
        title: 'ServControl - Meus Serviços'
      },
      {
        path: 'new',
        loadComponent: () => import('./services/service-form/service-form').then(m => m.ServiceForm),
        title: 'ServControl - Novo Serviço'
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./services/service-form/service-form').then(m => m.ServiceForm),
        title: 'ServControl - Editar Serviço'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./services/service-details/service-details').then(m => m.ServiceDetails),
        title: 'ServControl - Detalhes do Serviço'
      },
      {
        path: 'calendar',
        loadComponent: () => import('./services/calendar-view/calendar-view').then(m => m.CalendarView),
        title: 'ServControl - Calendário'
      }
    ]
  },

  // Financeiro
  {
    path: 'financial',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard, profileCompleteGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./financial/monthly-summary/monthly-summary').then(m => m.MonthlySummary),
        title: 'ServControl - Resumo Financeiro'
      },
      {
        path: 'projections',
        loadComponent: () => import('./financial/projections/projections').then(m => m.Projections),
        title: 'ServControl - Projeções'
      },
      {
        path: 'reports',
        loadComponent: () => import('./financial/reports/reports').then(m => m.Reports),
        title: 'ServControl - Relatórios Financeiros'
      }
    ]
  },

  // Relatórios
  {
    path: 'reports',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard, profileCompleteGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./reports/reports-list/reports-list').then(m => m.ReportsList),
        title: 'ServControl - Relatórios'
      },
      {
        path: 'generate',
        loadComponent: () => import('./reports/report-generator/report-generator').then(m => m.ReportGenerator),
        title: 'ServControl - Gerar Relatório'
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./reports/report-viewer/report-viewer').then(m => m.ReportViewer),
        title: 'ServControl - Visualizar Relatório'
      }
    ]
  },

  // 404 - Página não encontrada
  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found').then(m => m.NotFound),
    title: 'ServControl - Página não encontrada'
  }
];
