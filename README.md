# 🍽️ Sistema de Restaurante e Pedidos

## 📖 Descrição do Projeto

O **Sistema de Restaurante e Pedidos** é uma aplicação web full-stack desenvolvida para facilitar o gerenciamento completo de operações de restaurantes. O sistema permite o cadastro e controle de pratos do cardápio, gestão de clientes, realização de pedidos com cálculo automático de valores e geração de relatórios analíticos para acompanhamento de vendas.

A aplicação foi construída com foco em usabilidade, oferecendo uma interface moderna e intuitiva que permite aos usuários navegar facilmente entre diferentes funcionalidades através de abas organizadas. O projeto demonstra a implementação de operações CRUD completas (Create, Read, Update, Delete) com integração entre frontend e backend através de uma API RESTful.

### 🎯 Objetivos do Sistema

- **Gerenciamento de Cardápio**: Cadastrar, editar e remover pratos com informações detalhadas (nome, preço, categoria, ingredientes)
- **Controle de Clientes**: Manter um registro organizado de clientes com dados de contato e endereço
- **Processamento de Pedidos**: Facilitar a criação de pedidos com múltiplos itens e cálculo automático de valores
- **Análise de Vendas**: Gerar relatórios detalhados de pedidos agrupados por cliente, permitindo análise de comportamento de compra

### 🌟 Principais Características

- Interface responsiva que se adapta a diferentes tamanhos de tela
- Operações em tempo real com feedback visual para o usuário
- Validação de dados nos formulários
- Cálculo automático de valores totais dos pedidos
- Histórico completo de pedidos com data e hora
- Relatórios com totalização de gastos por cliente
- Confirmação de ações destrutivas (exclusões)
- Código limpo e bem estruturado seguindo boas práticas

---

## 🛠️ Tecnologias Utilizadas

### Backend (Servidor)

#### **Node.js (v18+)**
Runtime JavaScript que permite executar código JavaScript no servidor. Foi escolhido pela sua alta performance, grande comunidade e vasto ecossistema de bibliotecas disponíveis através do npm.

#### **Express.js (v4.18.2)**
Framework web minimalista e flexível para Node.js que fornece recursos robustos para aplicações web e APIs. Utilizado para:
- Criação de rotas HTTP (GET, POST, PUT, DELETE)
- Middleware para processamento de requisições
- Manipulação de JSON
- Estruturação da API RESTful

#### **CORS (v2.8.5)**
Middleware que permite requisições de diferentes origens (Cross-Origin Resource Sharing). Essencial para permitir que o frontend (porta 3000) se comunique com o backend (porta 3001) durante o desenvolvimento.

#### **Nodemon (v3.0.1)** - DevDependency
Ferramenta que monitora mudanças nos arquivos e reinicia automaticamente o servidor, agilizando o processo de desenvolvimento.

### Frontend (Cliente)

#### **React (v18.2.0)**
Biblioteca JavaScript para construção de interfaces de usuário. Escolhida por:
- Componentização: permite criar componentes reutilizáveis
- Virtual DOM: otimiza atualizações da interface
- Hooks: useState e useEffect para gerenciar estado e efeitos colaterais
- Grande comunidade e documentação extensa

#### **Vite (v5.0.0)**
Build tool moderna e extremamente rápida que oferece:
- Hot Module Replacement (HMR) instantâneo
- Build otimizado para produção
- Configuração simplificada
- Melhor performance que ferramentas tradicionais como Webpack

#### **Tailwind CSS (v3.3.0)**
Framework CSS utilitário que permite estilizar componentes rapidamente através de classes predefinidas. Benefícios:
- Desenvolvimento rápido sem sair do HTML/JSX
- Design system consistente
- Responsividade facilitada
- Bundle size otimizado em produção

#### **PostCSS (v8.4.32)** e **Autoprefixer (v10.4.16)**
Ferramentas para processar CSS, adicionando prefixos de navegadores automaticamente e otimizando o código CSS final.

#### **Lucide React (v0.263.1)**
Biblioteca moderna de ícones SVG para React. Fornece ícones limpos e consistentes como:
- `UtensilsCrossed`: Ícone de pratos
- `Users`: Ícone de clientes
- `ShoppingCart`: Ícone de pedidos
- `Plus`, `Edit2`, `Trash2`: Ações de CRUD

### Arquitetura da Aplicação

#### **Padrão de Comunicação**
```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│                 │    ←──────────────────→    │                 │
│  Frontend       │                             │   Backend       │
│  (React)        │    Fetch API / REST        │   (Express)     │
│  Porta 3000     │                             │   Porta 3001    │
│                 │                             │                 │
└─────────────────┘                             └─────────────────┘
        ↓                                               ↓
   Interface do                                  API RESTful
     Usuário                                     + Lógica de
                                                  Negócios
```

#### **Estrutura de Dados (In-Memory)**
O projeto utiliza armazenamento em memória para simplificar a demonstração:
- Arrays JavaScript para armazenar pratos, clientes e pedidos
- IDs auto-incrementais para cada entidade
- Relacionamento entre pedidos e clientes através de `clienteId`
- Relacionamento entre pedidos e pratos através de `pratoId`

### Funcionalidades Implementadas

#### **1. CRUD de Pratos**
- **Create**: Adicionar novos pratos ao cardápio
- **Read**: Listar todos os pratos cadastrados
- **Update**: Editar informações de pratos existentes
- **Delete**: Remover pratos do sistema

Campos do Prato:
```javascript
{
  id: Number,
  nome: String,
  preco: Number,
  categoria: String,
  ingredientes: String
}
```

#### **2. CRUD de Clientes**
- **Create**: Cadastrar novos clientes
- **Read**: Visualizar lista de clientes
- **Update**: Atualizar dados cadastrais
- **Delete**: Remover clientes

Campos do Cliente:
```javascript
{
  id: Number,
  nome: String,
  telefone: String,
  endereco: String
}
```

#### **3. CRUD de Pedidos**
- **Create**: Criar pedidos com múltiplos itens
- **Read**: Visualizar histórico de pedidos
- **Delete**: Cancelar pedidos

Estrutura do Pedido:
```javascript
{
  id: Number,
  clienteId: Number,
  itens: [
    {
      pratoId: Number,
      prato: Object,
      quantidade: Number
    }
  ],
  valorTotal: Number,
  data: String (ISO 8601)
}
```

#### **4. Relatório de Pedidos por Cliente**
- Agrupamento de pedidos por cliente
- Totalização de valores gastos
- Contagem de pedidos realizados
- Detalhamento de cada pedido

Estrutura do Relatório:
```javascript
{
  cliente: Object,
  pedidos: Array,
  totalGasto: Number,
  quantidadePedidos: Number
}
```

### API RESTful - Endpoints

#### Pratos
- `GET /api/pratos` - Lista todos os pratos
- `GET /api/pratos/:id` - Busca prato específico
- `POST /api/pratos` - Cria novo prato
- `PUT /api/pratos/:id` - Atualiza prato
- `DELETE /api/pratos/:id` - Remove prato

#### Clientes
- `GET /api/clientes` - Lista todos os clientes
- `GET /api/clientes/:id` - Busca cliente específico
- `POST /api/clientes` - Cria novo cliente
- `PUT /api/clientes/:id` - Atualiza cliente
- `DELETE /api/clientes/:id` - Remove cliente

#### Pedidos
- `GET /api/pedidos` - Lista todos os pedidos
- `GET /api/pedidos/:id` - Busca pedido específico
- `POST /api/pedidos` - Cria novo pedido
- `DELETE /api/pedidos/:id` - Cancela pedido

#### Relatórios
- `GET /api/relatorios/pedidos-por-cliente` - Relatório analítico

### Padrões e Boas Práticas

#### **Frontend**
- **Component-Based Architecture**: Código organizado em componentes React
- **State Management**: Uso de hooks (useState, useEffect) para gerenciar estado
- **Separation of Concerns**: Lógica separada da apresentação
- **Responsive Design**: Interface adaptável usando Tailwind CSS
- **User Feedback**: Alertas e confirmações para ações importantes

#### **Backend**
- **RESTful API**: Seguindo princípios REST
- **Error Handling**: Validação de dados e tratamento de erros
- **HTTP Status Codes**: Uso correto de códigos de status (200, 201, 400, 404, etc.)
- **CORS Enabled**: Permitindo comunicação cross-origin
- **Modular Code**: Rotas organizadas por recurso

### Fluxo de Dados

#### Criação de Pedido (Exemplo de Fluxo Completo)

1. **Frontend**: Usuário seleciona cliente e adiciona pratos
2. **Frontend**: Clique em "Finalizar Pedido" dispara função `handleFinalizarPedido()`
3. **Frontend**: Fetch API envia POST para `/api/pedidos`
4. **Backend**: Express recebe requisição e valida dados
5. **Backend**: Verifica se cliente existe
6. **Backend**: Verifica se todos os pratos existem
7. **Backend**: Calcula valor total do pedido
8. **Backend**: Cria objeto do pedido com data/hora
9. **Backend**: Armazena pedido no array
10. **Backend**: Retorna pedido criado (status 201)
11. **Frontend**: Recebe resposta e atualiza interface
12. **Frontend**: Limpa formulário e recarrega lista de pedidos
13. **Frontend**: Exibe mensagem de sucesso ao usuário

### Decisões de Design

#### **Por que React?**
React foi escolhido pela sua popularidade, facilidade de aprendizado e capacidade de criar interfaces dinâmicas e reativas. A abordagem de componentes facilita a manutenção e reutilização de código.

#### **Por que Express?**
Express é o framework Node.js mais popular, com sintaxe simples e grande flexibilidade. Perfeito para criar APIs RESTful de forma rápida e eficiente.

#### **Por que Tailwind CSS?**
Tailwind acelera o desenvolvimento de interfaces sem a necessidade de escrever CSS customizado. Facilita a criação de designs responsivos e consistentes.

#### **Por que In-Memory Storage?**
Para fins educacionais e de demonstração, o armazenamento em memória é suficiente. Facilita o entendimento da lógica sem a complexidade adicional de configurar um banco de dados.

### Possíveis Melhorias Futuras

- **Banco de Dados**: Integração com PostgreSQL ou MongoDB
- **Autenticação**: Sistema de login e controle de acesso
- **Validações**: Biblioteca como Joi ou Yup para validação robusta
- **Testes**: Jest para testes unitários e de integração
- **Docker**: Containerização para facilitar deploy
- **TypeScript**: Adicionar tipagem estática ao projeto
- **Paginação**: Para lidar com grandes volumes de dados
- **WebSocket**: Atualizações em tempo real
- **Upload de Imagens**: Para fotos dos pratos

---

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:3000**

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido como projeto educacional para demonstração de conceitos full-stack com React e Node.js.

---

## 🎓 Aprendizados

Este projeto demonstra:
- Criação de API RESTful com Express
- Desenvolvimento de SPA (Single Page Application) com React
- Comunicação Frontend-Backend via HTTP
- Gerenciamento de estado com React Hooks
- Estilização moderna com Tailwind CSS
- Operações CRUD completas
- Manipulação de dados relacionados
- Boas práticas de desenvolvimento web
