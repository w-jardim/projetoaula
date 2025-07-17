export type TipoTransacao = 'entrada' | 'saida' | 'estorno' | 'ajuste';
export type StatusPagamento = 'pendente' | 'processando' | 'pago' | 'atrasado' | 'cancelado';
export type TipoDespesa = 'equipamento' | 'transporte' | 'alimentacao' | 'documentacao' | 'curso' | 'exame_medico' | 'outros';
export type FormaPagamento = 'dinheiro' | 'pix' | 'transferencia' | 'cartao' | 'boleto';

export interface Transacao {
  id: string;
  agenteId: string;
  
  // Classificação
  tipo: TipoTransacao;
  categoria: 'escala' | 'adicional' | 'despesa' | 'reembolso' | 'multa' | 'bonus';
  
  // Valores
  valor: number;
  valorLiquido?: number;
  descontos?: {
    tipo: 'imposto' | 'contribuicao' | 'taxa' | 'multa';
    valor: number;
    descricao: string;
  }[];
  
  // Descrição
  titulo: string;
  descricao?: string;
  
  // Referências
  escalaId?: string;
  recibonumero?: string;
  notaFiscal?: string;
  
  // Datas
  dataVencimento: Date;
  dataPagamento?: Date;
  competencia: {
    mes: number;
    ano: number;
  };
  
  // Status
  status: StatusPagamento;
  formaPagamento?: FormaPagamento;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  criadoPor: string;
}

export interface ResumoFinanceiro {
  agenteId: string;
  periodo: {
    inicio: Date;
    fim: Date;
  };
  
  // Receitas
  receitas: {
    total: number;
    escalas: number;
    adicionais: number;
    bonificacoes: number;
    outros: number;
  };
  
  // Despesas
  despesas: {
    total: number;
    equipamentos: number;
    transporte: number;
    alimentacao: number;
    cursos: number;
    documentacao: number;
    outros: number;
  };
  
  // Resultado
  saldoLiquido: number;
  impostos: number;
  contribuicoes: number;
  
  // Estatísticas
  horasTrabalhadas: number;
  valorMedioHora: number;
  escalasRealizadas: number;
  
  // Comparativo
  comparativoMesAnterior: {
    receitas: number; // percentual de variação
    despesas: number;
    saldoLiquido: number;
  };
}

export interface Despesa {
  id: string;
  agenteId: string;
  
  // Classificação
  tipo: TipoDespesa;
  categoria: string;
  subcategoria?: string;
  
  // Valores
  valor: number;
  valorReembolsavel?: number;
  
  // Descrição
  titulo: string;
  descricao?: string;
  justificativa?: string;
  
  // Comprovantes
  notaFiscal?: {
    numero: string;
    serie: string;
    dataEmissao: Date;
    cnpjEmitente: string;
    arquivo?: string;
  };
  comprovantes: {
    tipo: 'nota_fiscal' | 'recibo' | 'cupom' | 'outros';
    arquivo: string;
    descricao?: string;
  }[];
  
  // Aprovação
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'reembolsada';
  aprovadaPor?: string;
  dataAprovacao?: Date;
  observacoesAprovacao?: string;
  
  // Datas
  dataGasto: Date;
  dataVencimento?: Date;
  dataPagamento?: Date;
  
  // Reembolso
  reembolso?: {
    valor: number;
    dataSolicitacao: Date;
    dataAprovacao?: Date;
    dataPagamento?: Date;
    formaPagamento: FormaPagamento;
    observacoes?: string;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjecaoFinanceira {
  agenteId: string;
  periodo: {
    inicio: Date;
    fim: Date;
  };
  
  // Projeções
  receitaProjetada: {
    total: number;
    escalasConfirmadas: number;
    escalasEstimadas: number;
    adicionais: number;
  };
  
  despesaProjetada: {
    total: number;
    fixas: number;
    variaveis: number;
    estimadas: number;
  };
  
  // Metas
  metas: {
    receitaMensal: number;
    horasMensais: number;
    escalasMensais: number;
    economiaDesejada: number;
  };
  
  // Análise
  analise: {
    viabilidade: 'excelente' | 'boa' | 'regular' | 'ruim';
    recomendacoes: string[];
    alertas: string[];
    oportunidades: string[];
  };
  
  // Cenários
  cenarios: {
    otimista: { receita: number; despesa: number; saldo: number };
    realista: { receita: number; despesa: number; saldo: number };
    pessimista: { receita: number; despesa: number; saldo: number };
  };
}

export interface ConfiguracaoFinanceira {
  agenteId: string;
  
  // Valores padrão
  valoresPadrao: {
    valorHoraNormal: number;
    valorHoraNoturno: number;
    valorHoraFeriado: number;
    adicionalPericulosidade: number;
    adicionalInsalubridade: number;
  };
  
  // Categorias de despesa personalizadas
  categoriasDespesa: {
    nome: string;
    icone: string;
    cor: string;
    ativa: boolean;
  }[];
  
  // Configurações de pagamento
  configPagamento: {
    diaPagamentoPreferido: number;
    formaPagamentoPreferida: FormaPagamento;
    contaBancaria: {
      banco: string;
      agencia: string;
      conta: string;
      pix?: string;
    };
  };
  
  // Alertas e notificações
  alertas: {
    receitaMinimaMensal: number;
    despesaMaximaMensal: number;
    saldoMinimoEmergencia: number;
    diasAntecedenciaVencimento: number;
  };
  
  // Relatórios automáticos
  relatoriosAutomaticos: {
    resumoMensal: boolean;
    projecaoTrimestral: boolean;
    alertaMetasMensais: boolean;
    demonstrativoAnual: boolean;
  };
}
