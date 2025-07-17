export type TipoRelatorio = 'horas_trabalhadas' | 'financeiro' | 'escalas' | 'performance' | 'ocorrencias' | 'compliance';
export type FormatoRelatorio = 'pdf' | 'excel' | 'csv' | 'json';
export type StatusRelatorio = 'gerando' | 'concluido' | 'erro' | 'expirado';
export type PeriodoRelatorio = 'dia' | 'semana' | 'mes' | 'trimestre' | 'semestre' | 'ano' | 'personalizado';

export interface FiltroRelatorio {
  periodo: {
    tipo: PeriodoRelatorio;
    inicio?: Date;
    fim?: Date;
  };
  agenteIds?: string[];
  locaisIds?: string[];
  tiposEscala?: string[];
  statusEscala?: string[];
  valorMinimo?: number;
  valorMaximo?: number;
  apenasComOcorrencias?: boolean;
}

export interface RelatorioBase {
  id: string;
  tipo: TipoRelatorio;
  titulo: string;
  descricao?: string;
  
  // Geração
  solicitadoPor: string;
  dataGeracao: Date;
  status: StatusRelatorio;
  progresso?: number; // 0-100
  erro?: string;
  
  // Configuração
  filtros: FiltroRelatorio;
  formato: FormatoRelatorio;
  configuracoes: {
    incluirGraficos: boolean;
    incluirDetalhes: boolean;
    incluirComparativos: boolean;
    agruparPor?: 'dia' | 'semana' | 'mes' | 'agente' | 'local' | 'tipo';
  };
  
  // Resultado
  arquivo?: {
    nome: string;
    tamanho: number;
    url: string;
    expiracaoUrl: Date;
  };
  
  // Estatísticas do relatório
  estatisticas?: {
    totalRegistros: number;
    totalHoras: number;
    totalValor: number;
    periodoCoberto: {
      inicio: Date;
      fim: Date;
    };
  };
  
  // Compartilhamento
  compartilhamento?: {
    publico: boolean;
    linkPublico?: string;
    senhaProtegido: boolean;
    expiracaoLink?: Date;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface RelatorioHorasTrabalhadas extends RelatorioBase {
  tipo: 'horas_trabalhadas';
  dados: {
    resumo: {
      totalHoras: number;
      horasRegulares: number;
      horasExtra: number;
      horasNoturnas: number;
      horasFeriados: number;
      diasTrabalhados: number;
    };
    
    detalhePorDia: {
      data: Date;
      horas: number;
      escalas: {
        id: string;
        local: string;
        horaInicio: Date;
        horaFim: Date;
        tipo: string;
      }[];
    }[];
    
    detalhePorLocal: {
      localId: string;
      localNome: string;
      totalHoras: number;
      percentual: number;
      escalas: number;
    }[];
    
    detalhePorTipo: {
      tipo: string;
      totalHoras: number;
      percentual: number;
      valorMedio: number;
    }[];
    
    comparativo?: {
      periodoAnterior: {
        totalHoras: number;
        variacao: number; // percentual
      };
      mediaMensal: number;
      tendencia: 'crescente' | 'estavel' | 'decrescente';
    };
  };
}

export interface RelatorioFinanceiro extends RelatorioBase {
  tipo: 'financeiro';
  dados: {
    resumo: {
      totalReceitas: number;
      totalDespesas: number;
      saldoLiquido: number;
      impostos: number;
      valorMedioHora: number;
    };
    
    receitas: {
      porCategoria: {
        categoria: string;
        valor: number;
        percentual: number;
      }[];
      porMes: {
        mes: number;
        ano: number;
        valor: number;
      }[];
      detalhada: {
        data: Date;
        descricao: string;
        valor: number;
        escalaId?: string;
      }[];
    };
    
    despesas: {
      porCategoria: {
        categoria: string;
        valor: number;
        percentual: number;
      }[];
      porMes: {
        mes: number;
        ano: number;
        valor: number;
      }[];
      detalhada: {
        data: Date;
        descricao: string;
        valor: number;
        tipo: string;
      }[];
    };
    
    fluxoCaixa: {
      data: Date;
      entradas: number;
      saidas: number;
      saldo: number;
      saldoAcumulado: number;
    }[];
    
    indicadores: {
      lucratividade: number; // percentual
      crescimentoReceita: number; // percentual
      eficienciaOperacional: number; // receita/hora
      pontoEquilibrio: number; // horas necessárias
    };
  };
}

export interface RelatorioPerformance extends RelatorioBase {
  tipo: 'performance';
  dados: {
    resumo: {
      avaliacaoMedia: number;
      pontualidade: number; // percentual
      assiduidade: number; // percentual
      produtividade: number; // horas/escala
      satisfacaoCliente: number;
    };
    
    avaliacoes: {
      mes: number;
      ano: number;
      media: number;
      quantidade: number;
      detalhes: {
        escalaId: string;
        local: string;
        nota: number;
        comentario?: string;
        data: Date;
      }[];
    }[];
    
    pontualidade: {
      mes: number;
      ano: number;
      escalasNoPrazo: number;
      escalasAtrasadas: number;
      percentualPontualidade: number;
    }[];
    
    assiduidade: {
      mes: number;
      ano: number;
      escalasCompletadas: number;
      escalasNaoCompareceu: number;
      percentualAssiduidade: number;
    }[];
    
    metas: {
      meta: string;
      valorMeta: number;
      valorAtingido: number;
      percentualAtingido: number;
      status: 'atingida' | 'nao_atingida' | 'superada';
    }[];
    
    melhorias: {
      area: string;
      recomendacao: string;
      prioridade: 'baixa' | 'media' | 'alta';
    }[];
  };
}

export interface RelatorioOcorrencias extends RelatorioBase {
  tipo: 'ocorrencias';
  dados: {
    resumo: {
      totalOcorrencias: number;
      ocorrenciasGraves: number;
      ocorrenciasResolvidas: number;
      tempoMedioResolucao: number; // em minutos
    };
    
    ocorrencias: {
      id: string;
      escalaId: string;
      local: string;
      tipo: string;
      gravidade: 'baixa' | 'media' | 'alta' | 'critica';
      descricao: string;
      dataOcorrencia: Date;
      dataResolucao?: Date;
      status: 'aberta' | 'em_andamento' | 'resolvida' | 'encaminhada';
      responsavel: string;
      acoes: string[];
    }[];
    
    estatisticasPorTipo: {
      tipo: string;
      quantidade: number;
      percentual: number;
      gravidade: {
        baixa: number;
        media: number;
        alta: number;
        critica: number;
      };
    }[];
    
    estatisticasPorLocal: {
      localId: string;
      localNome: string;
      quantidade: number;
      tipoMaisComum: string;
      indiceRisco: number;
    }[];
    
    tendencias: {
      mes: number;
      ano: number;
      quantidade: number;
      gravidade: 'baixa' | 'media' | 'alta';
    }[];
  };
}

export interface ConfiguracaoRelatorio {
  id: string;
  nome: string;
  descricao?: string;
  tipo: TipoRelatorio;
  
  // Configuração automática
  automatico: boolean;
  frequencia?: 'diaria' | 'semanal' | 'mensal' | 'trimestral';
  diaGeracao?: number; // dia do mês ou da semana
  horaGeracao?: string; // HH:mm
  
  // Configurações padrão
  configuracoesPadrao: {
    formato: FormatoRelatorio;
    incluirGraficos: boolean;
    incluirDetalhes: boolean;
    agruparPor: string;
  };
  
  // Filtros padrão
  filtrosPadrao: FiltroRelatorio;
  
  // Notificações
  notificacoes: {
    emailAoCompletar: boolean;
    emailParaAgentes: string[];
    emailParaSupervisores: string[];
  };
  
  // Armazenamento
  armazenamento: {
    manterPor: number; // dias
    arquivarApos: number; // dias
    backupAutomatico: boolean;
  };
  
  // Metadata
  criadoPor: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
