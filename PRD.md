# PRD - App de Controle Financeiro Preventivo

## 0. Nome do app

Oikonomia (Grego: οἰκονομία)

- Significado: Gestão da casa, economia
- Conceito: Origem da palavra "economia", administração doméstica

---

## 1. Visão Geral do Produto

### Problema

Usuários que usam principalmente cartão de crédito precisam de uma ferramenta que ofereça **previsibilidade** nos gastos, não apenas registro após o fato consumado, evitando surpresas na fatura e permitindo controle proativo do orçamento.

### Solução

Uma aplicação web simples e intuitiva que permite planejamento financeiro preventivo com foco em cartão de crédito, oferecendo visibilidade em tempo real dos gastos e projeções futuras.

### Objetivo

Desenvolver um MVP funcional que permita ao usuário:

- Criar e gerenciar orçamentos mensais
- Acompanhar gastos em tempo real
- Visualizar projeções e limites
- Controlar parcelamentos
- Obter insights sobre padrões de consumo

---

## 2. Stack Tecnológica

### Frontend

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Zustand** (gerenciamento de estado)

### Backend

- **Next.js API Routes**
- **PostgreSQL** (banco de dados)
- **Prisma ORM**
- **NextAuth.js** (autenticação)

### Validação & Qualidade

- **Zod** (validação de schemas)
- **Ultracite** + **Biome**
- **TypeScript strict mode**

### Infraestrutura

- **Vercel** (deploy)
- **Vercel Postgres** ou **Supabase**

---

## 3. Arquitetura do Sistema

### Estrutura de Dados

```typescript
// Prisma Schema
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  
  budgets      Budget[]
  transactions Transaction[]
  creditCards  CreditCard[]
}

model Budget {
  id          String   @id @default(uuid())
  userId      String
  month       Int
  year        Int
  income      Decimal
  fixedExpenses Decimal
  
  categories  BudgetCategory[]
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([userId, month, year])
}

model BudgetCategory {
  id          String   @id @default(uuid())
  budgetId    String
  name        String
  planned     Decimal
  spent       Decimal  @default(0)
  type        CategoryType
  
  budget      Budget   @relation(fields: [budgetId], references: [id])
  transactions Transaction[]
}

model CreditCard {
  id          String   @id @default(uuid())
  userId      String
  name        String
  limit       Decimal
  dueDay      Int
  
  user        User     @relation(fields: [userId], references: [id])
  transactions Transaction[]
  installments Installment[]
}

model Transaction {
  id            String   @id @default(uuid())
  userId        String
  categoryId    String
  creditCardId  String
  amount        Decimal
  description   String
  date          DateTime
  installments  Int      @default(1)
  
  user          User     @relation(fields: [userId], references: [id])
  category      BudgetCategory @relation(fields: [categoryId], references: [id])
  creditCard    CreditCard @relation(fields: [creditCardId], references: [id])
}

model Installment {
  id            String   @id @default(uuid())
  creditCardId  String
  description   String
  amount        Decimal
  currentMonth  Int
  totalMonths   Int
  startDate     DateTime
  
  creditCard    CreditCard @relation(fields: [creditCardId], references: [id])
}

enum CategoryType {
  ESSENTIAL
  LIFESTYLE
  EMERGENCY
}
```

---

## 4. Funcionalidades Principais

### 4.1 Autenticação e Onboarding

**Prioridade: Alta**

**Funcionalidades:**

- Login com Google/GitHub via NextAuth.js
- Wizard de configuração inicial
- Configuração de perfil básico

**Critérios de Aceitação:**

- Usuário consegue fazer login com provedores OAuth
- Primeiro acesso redireciona para wizard de configuração
- Dados básicos (renda, gastos fixos) são coletados no onboarding

### 4.2 Dashboard Principal

**Prioridade: Alta**

**Funcionalidades:**

- Visão geral do mês atual
- Gráfico de gastos por categoria
- Indicadores de limite (semáforo verde/amarelo/vermelho)
- Resumo dos próximos vencimentos
- Projeção de gastos do mês

**Critérios de Aceitação:**

- Dashboard carrega em menos de 2 segundos
- Dados são atualizados em tempo real
- Indicadores visuais são claros e intuitivos
- Responsivo para mobile

### 4.3 Gestão de Orçamento

**Prioridade: Alta**

**Funcionalidades:**

- Criação/edição de orçamento mensal
- Categorização (Essencial, Estilo de Vida, Emergência)
- Distribuição automática baseada em percentuais
- Histórico de orçamentos anteriores

**Critérios de Aceitação:**

- Usuário consegue criar orçamento em menos de 5 minutos
- Validação de dados com Zod
- Categorias pré-definidas e personalizáveis
- Cálculos automáticos de distribuição

### 4.4 Registro de Transações

**Prioridade: Alta**

**Funcionalidades:**

- Formulário rápido de adição de gasto
- Seleção de categoria e cartão
- Suporte a parcelamento
- Validação de limites antes da confirmação

**Critérios de Aceitação:**

- Formulário com validação em tempo real
- Aviso quando gasto excede categoria
- Opção de parcelamento com cálculo automático
- Confirmação visual após registro

### 4.5 Gestão de Cartões de Crédito

**Prioridade: Media**

**Funcionalidades:**

- Cadastro de múltiplos cartões
- Definição de limites e dias de vencimento
- Visualização de uso por cartão
- Alertas de limite

**Critérios de Aceitação:**

- Suporte a múltiplos cartões
- Cálculo correto do limite disponível
- Alertas configuráveis
- Histórico de uso por cartão

### 4.6 Controle de Parcelamentos

**Prioridade: Media**

**Funcionalidades:**

- Listagem de parcelamentos ativos
- Projeção de comprometimento futuro
- Simulador de novas parcelas
- Alertas de vencimento

**Critérios de Aceitação:**

- Lista clara de todos os parcelamentos
- Cálculo preciso do comprometimento
- Simulador funcional
- Notificações de vencimento

### 4.7 Relatórios e Análises

**Prioridade: Baixa**

**Funcionalidades:**

- Relatório mensal de gastos
- Comparativo entre meses
- Análise de tendências
- Exportação de dados

**Critérios de Aceitação:**

- Gráficos interativos
- Filtros por período
- Dados exportáveis (CSV/PDF)
- Insights automáticos

---

## 5. Interface do Usuário

### 5.1 Layout Principal

```
┌─────────────────────────────────────────────────────┐
│ Header (Logo, User Menu, Notifications)             │
├─────────────────────────────────────────────────────┤
│ Sidebar      │ Main Content Area                    │
│              │                                      │
│ - Dashboard  |                                      │
│ - Orçamento  |                                      │
│ - Transações |                                      │
│ - Cartões    |                                      │
│ - Relatórios |                                      │
│              │                                      │
└─────────────────────────────────────────────────────┘
```

### 5.2 Componentes Principais

**Dashboard Cards:**

- Saldo disponível
- Gasto mensal atual
- Maior categoria
- Próximo vencimento

**Formulários:**

- Registro de transação (modal)
- Configuração de orçamento
- Cadastro de cartão

**Gráficos:**

- Donut chart (categorias)
- Line chart (evolução mensal)
- Progress bars (limites)

### 5.3 Responsividade

- Mobile-first design
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Menu colapsável em mobile
- Cards empilhados em telas pequenas

---

## 6. Fluxos de Usuário

### 6.1 Primeiro Acesso

1. Usuário faz login
2. Wizard de configuração:
   - Renda mensal
   - Gastos fixos
   - Primeiro cartão de crédito
   - Categorias de orçamento
3. Redirecionamento para dashboard

### 6.2 Adição de Gasto

1. Usuário clica em "Adicionar Gasto"
2. Preenche formulário:
   - Valor
   - Descrição
   - Categoria
   - Cartão
   - Parcelamento (opcional)
3. Sistema valida limites
4. Confirmação e atualização do dashboard

### 6.3 Configuração de Orçamento

1. Usuário acessa "Orçamento"
2. Define valores por categoria
3. Sistema calcula distribuição
4. Validação e salvamento
5. Atualização dos indicadores

---

## 7. Gerenciamento de Estado (Zustand)

### 7.1 Stores Principais

```typescript
// authStore.ts
interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// budgetStore.ts
interface BudgetState {
  currentBudget: Budget | null;
  categories: BudgetCategory[];
  transactions: Transaction[];
  isLoading: boolean;
  
  fetchBudget: (month: number, year: number) => Promise<void>;
  updateCategory: (id: string, data: Partial<BudgetCategory>) => void;
  addTransaction: (transaction: CreateTransactionInput) => Promise<void>;
}

// creditCardStore.ts
interface CreditCardState {
  cards: CreditCard[];
  installments: Installment[];
  isLoading: boolean;
  
  fetchCards: () => Promise<void>;
  addCard: (card: CreateCreditCardInput) => Promise<void>;
  updateCard: (id: string, data: Partial<CreditCard>) => void;
}

// uiStore.ts
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Notification) => void;
}
```

---

## 8. Validação com Zod

### 8.1 Schemas Principais

```typescript
// schemas/transaction.ts
export const createTransactionSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  categoryId: z.string().uuid('Categoria inválida'),
  creditCardId: z.string().uuid('Cartão inválido'),
  installments: z.number().min(1).max(24).default(1),
  date: z.date().default(() => new Date()),
});

// schemas/budget.ts
export const createBudgetSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2024),
  income: z.number().positive('Renda deve ser positiva'),
  fixedExpenses: z.number().positive('Gastos fixos devem ser positivos'),
  categories: z.array(z.object({
    name: z.string().min(1),
    planned: z.number().positive(),
    type: z.enum(['ESSENTIAL', 'LIFESTYLE', 'EMERGENCY']),
  })),
});

// schemas/creditCard.ts
export const createCreditCardSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  limit: z.number().positive('Limite deve ser positivo'),
  dueDay: z.number().min(1).max(31),
});
```

---

## 9. APIs e Endpoints

### 9.1 Estrutura de APIs

```typescript
// /api/auth/[...nextauth].ts
// Configuração NextAuth.js

// /api/budget/
GET    /api/budget/[month]/[year]     // Buscar orçamento
POST   /api/budget                    // Criar orçamento
PUT    /api/budget/[id]               // Atualizar orçamento
DELETE /api/budget/[id]               // Deletar orçamento

// /api/transactions/
GET    /api/transactions              // Listar transações
POST   /api/transactions              // Criar transação
PUT    /api/transactions/[id]         // Atualizar transação
DELETE /api/transactions/[id]         // Deletar transação

// /api/credit-cards/
GET    /api/credit-cards              // Listar cartões
POST   /api/credit-cards              // Criar cartão
PUT    /api/credit-cards/[id]         // Atualizar cartão
DELETE /api/credit-cards/[id]         // Deletar cartão

// /api/analytics/
GET    /api/analytics/dashboard       // Dados do dashboard
GET    /api/analytics/monthly/[month]/[year] // Relatório mensal
```

### 9.2 Middleware de Autenticação

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

---

## 10. Cronograma de Desenvolvimento

### Sprint 1 (Semana 1-2) - Fundação

- [ ] Configuração do projeto Next.js
- [ ] Setup do banco de dados e Prisma
- [ ] Configuração do NextAuth.js
- [ ] Estrutura básica de componentes (shadcn/ui)
- [ ] Layout principal e navegação

### Sprint 2 (Semana 3-4) - Core Features

- [ ] Gestão de orçamento
- [ ] Registro de transações
- [ ] Dashboard básico
- [ ] Stores Zustand principais

### Sprint 3 (Semana 5-6) - Cartões e Parcelamentos

- [ ] Gestão de cartões de crédito
- [ ] Sistema de parcelamentos
- [ ] Cálculos de limites e projeções
- [ ] Validações com Zod

### Sprint 4 (Semana 7-8) - UI/UX e Otimizações

- [ ] Responsividade completa
- [ ] Indicadores visuais (semáforo)
- [ ] Notificações e alertas
- [ ] Testes e correções

### Sprint 5 (Semana 9-10) - Deploy e Refinamentos

- [ ] Deploy na Vercel
- [ ] Configuração de produção
- [ ] Testes de usuário
- [ ] Documentação

---

## 11. Critérios de Sucesso

### Métricas de Performance

- Tempo de carregamento inicial < 2s
- Tempo de resposta das APIs < 500ms
- Score de Lighthouse > 90

### Métricas de Usabilidade

- Onboarding completo em < 5 minutos
- Registro de transação em < 30 segundos
- Interface intuitiva (sem necessidade de tutorial)

### Métricas de Negócio

- Usuário consegue visualizar orçamento vs realizado
- Alertas de limite funcionam corretamente
- Projeções são precisas (margem de erro < 5%)

---

## 12. Considerações Técnicas

### 12.1 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Rate limiting nas APIs
- Logs de auditoria para transações

### 12.2 Performance

- Server-side rendering para SEO
- Caching de dados estáticos
- Lazy loading de componentes
- Compressão de assets

### 12.3 Escalabilidade

- Arquitetura modular
- Separação de responsabilidades
- Possibilidade de microserviços futuros
- Database indexing otimizado

---

## 13. Riscos e Mitigações

### Alto Risco

- **Complexidade dos cálculos financeiros**
  - Mitigação: Testes unitários extensivos, validação dupla
  
- **Precisão das projeções**
  - Mitigação: Algoritmos simples e transparentes

### Médio Risco

- **Performance com muitos dados**
  - Mitigação: Paginação, lazy loading, caching
  
- **Compatibilidade mobile**
  - Mitigação: Testes em múltiplos dispositivos

### Baixo Risco

- **Integração com bancos**
  - Mitigação: Não está no escopo do MVP

---

## 14. Próximos Passos

### Pós-MVP

1. Integração com APIs bancárias
2. Aplicativo mobile React Native
3. Relatórios avançados com IA
4. Metas financeiras e gamificação
5. Compartilhamento familiar

### Melhorias Técnicas

1. Testes automatizados (Jest, Cypress)
2. CI/CD pipeline
3. Monitoramento e logs
4. Backup automático
5. Multi-tenancy

---

## 15. Conclusão

Este PRD define um MVP robusto para um app de controle financeiro preventivo, priorizando simplicidade e eficácia. A arquitetura escolhida permite desenvolvimento rápido com tecnologias modernas, mantendo flexibilidade para futuras expansões.

**Próximo passo recomendado:** Iniciar com a configuração do ambiente de desenvolvimento e implementação da autenticação básica.
