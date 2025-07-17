export type TipoEscala = 'plantao' | 'ronda' | 'evento' | 'escolta' | 'extra' | 'substituicao';
export type StatusEscala = 'agendada' | 'confirmada' | 'em_andamento' | 'concluida' | 'cancelada' | 'nao_compareceu';
export type TipoLocal = 'residencial' | 'comercial' | 'industrial' | 'eventos' | 'transporte' | 'escolta' | 'banco' | 'shopping';
export type Turno = 'manha' | 'tarde' | 'noite' | 'madrugada' | 'integral';

export interface LocalTrabalho {
  id: string;
  nome: string;
  tipo: TipoLocal;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    coordenadas?: {
      latitude: number;
      longitude: number;
    };
  };
  contato: {
    responsavel: string;
    telefone: string;
    email?: string;
  };
  observacoes?: string;
  riscoNivel: 'baixo' | 'medio' | 'alto' | 'critico';
  requerArma: boolean;
  equipamentosNecessarios: string[];
}

export interface Escala {
  id: string;
  
  // Identificação
  titulo: string;
  descricao?: string;
  tipo: TipoEscala;
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente';
  
  // Agente
  agenteId: string;
  agenteNome: string;
  
  // Local e Tempo
  local: LocalTrabalho;
  dataInicio: Date;
  dataFim: Date;
  turno: Turno;
  duracao: number; // em horas
  
  // Financeiro
  valorHora: number;
  valorTotal: number;
  adicionalNoturno?: number;
  adicionalPericulosidade?: number;
  adicionalFeriado?: number;
  
  // Status e Controle
  status: StatusEscala;
  confirmadaEm?: Date;
  iniciadaEm?: Date;
  finalizadaEm?: Date;
  canceladaEm?: Date;
  motivoCancelamento?: string;
  
  // Substituição/Troca
  podeSerSubstituida: boolean;
  substitutoId?: string;
  solicitacaoTroca?: {
    solicitanteId: string;
    motivo: string;
    datasolicitacao: Date;
    status: 'pendente' | 'aprovada' | 'negada';
  };
  
  // Observações e Relatórios
  observacoes?: string;
  equipamentosUtilizados?: string[];
  relatorioFinal?: string;
  ocorrencias?: string[];
  
  // Avaliação
  avaliacao?: {
    nota: number;
    comentario?: string;
    avaliadoPor: string;
    dataAvaliacao: Date;
  };
  
  // Metadata
  criadaPor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlantaoAtivo {
  id: string;
  escalaId: string;
  agenteId: string;
  status: 'iniciado' | 'pausado' | 'finalizado';
  horaInicio: Date;
  horaFim?: Date;
  pausas: {
    inicio: Date;
    fim?: Date;
    motivo: string;
  }[];
  localizacao?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  };
  checkins: {
    timestamp: Date;
    localizacao?: {
      latitude: number;
      longitude: number;
    };
    observacao?: string;
  }[];
  emergencias?: {
    tipo: 'medica' | 'seguranca' | 'incendio' | 'outros';
    descricao: string;
    timestamp: Date;
    resolvida: boolean;
  }[];
}

export interface RelatorioEscala {
  escalaId: string;
  agenteId: string;
  dataRelatorio: Date;
  horasEfetivas: number;
  ocorrencias: {
    tipo: 'normal' | 'incidente' | 'emergencia';
    descricao: string;
    horario: Date;
    gravidade: 'baixa' | 'media' | 'alta';
  }[];
  equipamentosUtilizados: string[];
  observacoesGerais: string;
  recomendacoes?: string;
  proximaEscala?: {
    necessidades: string[];
    melhorias: string[];
  };
}

export interface EstatisticasEscala {
  agenteId: string;
  periodo: {
    inicio: Date;
    fim: Date;
  };
  totalEscalas: number;
  escalasCompletadas: number;
  escalascanceladas: number;
  horasTrabalhadas: number;
  valorTotal: number;
  avaliacaoMedia: number;
  pontualidade: number; // percentual
  locaisTrabalho: {
    localId: string;
    nome: string;
    quantidade: number;
  }[];
  tiposEscala: {
    tipo: TipoEscala;
    quantidade: number;
    horasTotais: number;
  }[];
}
