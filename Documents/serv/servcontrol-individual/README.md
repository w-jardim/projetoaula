# 🛡️ ServControl - Sistema de Controle de Escalas para Agentes de Segurança

[![Angular](https://img.shields.io/badge/Angular-20.x.x-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material%20Design-3.0-purple.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Sobre o Projeto

O **ServControl** é um sistema pessoal de controle de escalas desenvolvido especialmente para agentes de segurança pública. O sistema permite gerenciar plantões, escalas, controle financeiro e relatórios de forma eficiente e intuitiva.

### 🎯 Funcionalidades Principais

- **🗓️ Gestão de Escalas**: Controle completo de plantões e escalas
- **👮 Perfil do Agente**: Dados pessoais, certificações e qualificações
- **💰 Controle Financeiro**: Pagamentos, gastos e metas financeiras
- **📊 Relatórios**: Dashboards e relatórios personalizados
- **🔒 Segurança**: Autenticação 2FA e controle de permissões
- **📱 PWA**: Funciona offline e pode ser instalado no dispositivo

## 🏗️ Arquitetura

### Tecnologias Utilizadas

- **Frontend**: Angular 20.x.x (Standalone Components)
- **UI Framework**: Angular Material Design 3.0
- **Language**: TypeScript 5.x
- **State Management**: RxJS + Signals
- **Styling**: SCSS + Material Theming
- **Backend**: Supabase (PostgreSQL + Realtime + Auth)
- **PWA**: Angular Service Worker
- **Charts**: Chart.js / ng2-charts

### Estrutura do Projeto

```
src/
├── app/
│   ├── auth/                 # Autenticação (Login, Registro, Recuperação)
│   ├── core/                 # Serviços core e interfaces
│   │   ├── interfaces/       # TypeScript interfaces do domínio
│   │   ├── guards/           # Guards de autenticação e autorização
│   │   ├── interceptors/     # HTTP interceptors
│   │   └── services/         # Serviços principais
│   ├── dashboard/            # Dashboard principal
│   │   ├── home/             # Tela inicial
│   │   └── widgets/          # Widgets do dashboard
│   ├── layout/               # Layout da aplicação
│   │   ├── header/           # Cabeçalho
│   │   ├── sidebar/          # Menu lateral
│   │   └── footer/           # Rodapé
│   ├── financial/            # Módulo financeiro
│   ├── services/             # Componentes de escalas e serviços
│   ├── reports/              # Módulo de relatórios
│   ├── profile/              # Perfil do usuário
│   └── shared/               # Componentes compartilhados
└── environments/             # Configurações de ambiente
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ e npm
- Angular CLI 20.x.x
- Git

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/w-jardim/projetoaula.git
   cd servcontrol-individual
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Copie o arquivo de exemplo
   cp src/environments/environment.example.ts src/environments/environment.ts
   
   # Configure suas credenciais do Supabase
   # SUPABASE_URL=sua_url_supabase
   # SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   ng serve
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:4200
   ```

## 📝 Status de Implementação

### ✅ FASE 1 - Correção de Contexto (CONCLUÍDA)
- [x] Dashboard atualizado para agentes de segurança
- [x] Sidebar com menu específico (Escalas, Plantões, Financeiro, Relatórios)
- [x] Widgets atualizados: Stats, QuickActions, EscalasRecentes
- [x] Environment configurado para tema 'security'

### ✅ FASE 2 - Interfaces do Domínio (CONCLUÍDA)
- [x] **AgenteSeguranca**: dados pessoais, profissionais, certificações
- [x] **Escala**: plantões, substituições, avaliações, workflow
- [x] **Financeiro**: pagamentos, gastos, metas, impostos
- [x] **Relatorio**: dashboards, filtros, auditoria
- [x] **Sistema**: usuário, configurações, estados da aplicação

### 🔄 FASE 3 - Serviços Core (EM ANDAMENTO)
- [ ] Serviços Supabase (CRUD + Auth)
- [ ] AuthService com 2FA
- [ ] EscalasService (gestão completa)
- [ ] PlantoesService (substituições)
- [ ] FinanceiroService (pagamentos)
- [ ] RelatoriosService (geração)
- [ ] NotificationService (alertas)
- [ ] LocalStorageService (cache)

### 🔄 FASE 4 - Theme/UI (PENDENTE)
- [ ] Tema personalizado para agentes de segurança
- [ ] Componentes UI específicos
- [ ] Responsividade mobile-first
- [ ] Acessibilidade (WCAG 2.1)

### 🔄 FASE 5 - Componentes Únicos (PENDENTE)
- [ ] Calendário de escalas
- [ ] Formulários de plantão
- [ ] Dashboards financeiros
- [ ] Sistema de notificações
- [ ] Relatórios PDF

## 🔒 Interfaces do Sistema

### AgenteSeguranca
```typescript
interface AgenteSeguranca {
  id: string;
  nome: string;
  cpf: string;
  registroProfissional: string;
  especializacoes: Especializacao[];
  porte_arma: boolean;
  status: StatusAgente;
  // ... mais campos
}
```

### Escala
```typescript
interface Escala {
  id: string;
  agente: string;
  local: LocalEscala;
  dataInicio: Date;
  duracao: number;
  tipo: TipoEscala;
  status: StatusEscala;
  // ... mais campos
}
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento
npm run build          # Build de produção
npm run test           # Executa testes unitários
npm run e2e            # Executa testes e2e
npm run lint           # Executa linting
npm run format         # Formata código

# Utilitários
npm run generate:components    # Gera todos os componentes
npm run analyze              # Analisa bundle size
npm run pwa:build           # Build PWA
```

## 📊 Funcionalidades Detalhadas

### Dashboard
- **Stats Cards**: Escalas do mês, receita, plantões agendados
- **Quick Actions**: Ações rápidas para agendamento e relatórios
- **Escalas Recentes**: Histórico de últimas escalas
- **Gráficos**: Tendências de receita e horas trabalhadas

### Gestão de Escalas
- Calendário visual de plantões
- Agendamento de escalas
- Sistema de trocas e substituições
- Controle de disponibilidade

### Controle Financeiro
- Registro de pagamentos
- Controle de gastos operacionais
- Metas e projeções
- Relatórios financeiros

### Perfil do Agente
- Dados pessoais e profissionais
- Certificações e especializações
- Histórico de trabalho
- Configurações pessoais

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Wallace Jardim** - [@w-jardim](https://github.com/w-jardim)

## 📞 Suporte

Para suporte, entre em contato através do [GitHub Issues](https://github.com/w-jardim/projetoaula/issues).

---

**Desenvolvido com ❤️ para agentes de segurança pública**
