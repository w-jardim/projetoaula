export type NivelExperiencia = 'trainee' | 'junior' | 'pleno' | 'senior' | 'especialista';
export type StatusAgente = 'ativo' | 'inativo' | 'suspenso' | 'afastado' | 'aposentado';
export type TipoDocumento = 'rg' | 'cpf' | 'cnh' | 'certidao_nascimento' | 'comprovante_residencia' | 'certificado_curso' | 'exame_medico';

export interface Especializacao {
  id: string;
  nome: string;
  categoria: 'armado' | 'desarmado' | 'escolta' | 'eventos' | 'transporte_valores' | 'residencial' | 'comercial';
  certificado: boolean;
  dataValidade?: Date;
  instituicao?: string;
}

export interface Documento {
  id: string;
  tipo: TipoDocumento;
  numero: string;
  dataEmissao: Date;
  dataValidade?: Date;
  orgaoEmissor: string;
  arquivo?: string; // URL do arquivo
  verificado: boolean;
}

export interface EnderecoAgente {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface ContatoEmergencia {
  nome: string;
  telefone: string;
  parentesco: string;
  endereco?: EnderecoAgente;
}

export interface AgenteSeguranca {
  id: string;
  // Dados Pessoais
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  sexo: 'M' | 'F' | 'Outro';
  estadoCivil: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel';
  
  // Contato
  telefone: string;
  email: string;
  endereco: EnderecoAgente;
  contatoEmergencia: ContatoEmergencia;
  
  // Dados Profissionais
  registroProfissional: string;
  dataAdmissao: Date;
  nivelExperiencia: NivelExperiencia;
  status: StatusAgente;
  
  // Especializações e Certificações
  especializacoes: Especializacao[];
  porte_arma: boolean;
  numero_porte?: string;
  validade_porte?: Date;
  
  // Documentação
  documentos: Documento[];
  
  // Configurações
  disponibilidade: {
    diasSemana: boolean[];
    horaInicio: string;
    horaFim: string;
    plantao24h: boolean;
  };
  
  // Dados Bancários
  dadosBancarios?: {
    banco: string;
    agencia: string;
    conta: string;
    tipoConta: 'corrente' | 'poupanca';
    pix?: string;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface PerfilCompleto {
  agente: AgenteSeguranca;
  estatisticas: {
    totalEscalas: number;
    horasTrabalhadas: number;
    avaliacaoMedia: number;
    pontuacao: number;
  };
  certificacoes: Especializacao[];
  proximasEscalas: number;
}
