// Re-exporta todas as interfaces do sistema
export * from './agente.interface';
export * from './escala.interface';
export * from './financeiro.interface';
export * from './relatorio.interface';

// Interfaces principais do sistema
export type TemaAplicacao = 'security' | 'light' | 'dark' | 'high-contrast';
export type Modulo = 'dashboard' | 'escalas' | 'plantoes' | 'financeiro' | 'relatorios' | 'perfil' | 'configuracoes';

export interface Usuario {
  id: string;
  email: string;
  senha?: string; // nunca retornada do backend
  
  // Perfil básico
  perfil: {
    nome: string;
    avatar?: string;
    tema: TemaAplicacao;
    idioma: 'pt-BR' | 'en-US' | 'es-ES';
    timezone: string;
  };
  
  // Permissões e roles
  roles: ('agente' | 'supervisor' | 'admin' | 'financeiro')[];
  permissoes: {
    modulo: Modulo;
    acoes: ('ler' | 'criar' | 'editar' | 'deletar' | 'aprovar')[];
  }[];
  
  // Configurações
  configuracoes: {
    notificacoes: {
      email: boolean;
      push: boolean;
      sms: boolean;
      tipos: ('nova_escala' | 'troca_plantao' | 'pagamento' | 'lembrete' | 'emergencia')[];
    };
    seguranca: {
      autenticacao2FA: boolean;
      login_biometrico: boolean;
      sessaoExpiraEm: number; // minutos
    };
    interface: {
      tema: TemaAplicacao;
      menuCollapsed: boolean;
      densidade: 'compacta' | 'normal' | 'confortavel';
      animacoes: boolean;
    };
  };
  
  // Dados do agente (se role inclui 'agente')
  agenteId?: string;
  
  // Auditoria
  ultimoLogin?: Date;
  loginCount: number;
  ativo: boolean;
  emailVerificado: boolean;
  telefoneVerificado: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface SessaoUsuario {
  usuario: Usuario;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  permissions: string[];
  agente?: {
    id: string;
    nome: string;
    registro: string;
    status: string;
  };
}

export interface ConfiguracaoSistema {
  // Configurações gerais
  geral: {
    nomeAplicacao: string;
    versao: string;
    ambiente: 'development' | 'staging' | 'production';
    manuntencao: boolean;
    mensagemManutencao?: string;
  };
  
  // Configurações de escalas
  escalas: {
    antecedenciaMinima: number; // horas
    cancelamentoAntecedencia: number; // horas
    trocaAntecedencia: number; // horas
    valorMinimoHora: number;
    valorMaximoHora: number;
    horasMaximasContinuas: number;
    intervalorMinimoEscalas: number; // horas
  };
  
  // Configurações financeiras
  financeiro: {
    moeda: 'BRL' | 'USD' | 'EUR';
    diasPagamento: number[];
    formaPagamentoPadrao: 'pix' | 'transferencia' | 'dinheiro';
    impostos: {
      ir: number; // percentual
      inss: number; // percentual
      iss: number; // percentual
    };
  };
  
  // Configurações de notificações
  notificacoes: {
    emailHabilitado: boolean;
    smsHabilitado: boolean;
    pushHabilitado: boolean;
    templates: {
      tipo: string;
      assunto: string;
      template: string;
    }[];
  };
  
  // Configurações de segurança
  seguranca: {
    senhaMinima: number;
    senhaComplexidade: boolean;
    autenticacao2FAObrigatoria: boolean;
    sessaoTimeoutMinutos: number;
    maxTentativasLogin: number;
    bloqueioTentativasMinutos: number;
  };
  
  // Integrações
  integracoes: {
    supabase: {
      habilitado: boolean;
      url: string;
      backupAutomatico: boolean;
    };
    maps: {
      provider: 'google' | 'mapbox' | 'openstreet';
      apiKey: string;
    };
    pagamento: {
      provider: 'stripe' | 'mercadopago' | 'pagseguro';
      habilitado: boolean;
    };
  };
}

export interface DashboardData {
  agente: {
    id: string;
    nome: string;
    status: string;
    proximaEscala?: {
      data: Date;
      local: string;
      tipo: string;
    };
  };
  
  estatisticas: {
    escalasEsteMes: number;
    receitaTotal: number;
    plantoesAgendados: number;
    valorPorHora: number;
    tendencias: {
      escalas: number; // percentual
      receita: number; // percentual
      horas: number; // percentual
    };
  };
  
  escalasRecentes: {
    id: string;
    titulo: string;
    local: string;
    data: Date;
    status: string;
    valor: number;
    duracao: string;
    tipo: string;
  }[];
  
  proximasEscalas: {
    id: string;
    titulo: string;
    local: string;
    dataInicio: Date;
    duracao: number;
    valor: number;
  }[];
  
  alertas: {
    tipo: 'info' | 'warning' | 'error' | 'success';
    titulo: string;
    mensagem: string;
    acao?: {
      label: string;
      url: string;
    };
  }[];
  
  chartData: {
    ultimosSeisMeses: {
      mes: string;
      escalas: number;
      receita: number;
      horas: number;
    }[];
    
    distribuicaoTipos: {
      tipo: string;
      quantidade: number;
      percentual: number;
    }[];
    
    performanceMensal: {
      meta: number;
      realizado: number;
      percentual: number;
    };
  };
}

// Tipos utilitários
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type SortOrder = 'asc' | 'desc';

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
  search?: string;
  filters?: Record<string, any>;
}

// Estados da aplicação
export interface AppState {
  user: SessaoUsuario | null;
  loading: boolean;
  theme: TemaAplicacao;
  sidebarOpen: boolean;
  notifications: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: Date;
    read: boolean;
  }[];
  lastSync: Date | null;
  offlineMode: boolean;
}
