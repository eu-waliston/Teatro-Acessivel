<div align="center">

# 🎭 Teatro-Acessivel — Sistema de Solicitação de Recursos de Acessibilidade

Plataforma web full-stack (**MERN**) para gerenciamento de informações acessíveis das apresentações
do Teatro Acessivel, permitindo que o público solicite previamente os recursos de acessibilidade
de que precisa e avalie sua experiência após o espetáculo.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-licença)

</div>

---

## 📖 Sobre o projeto

O sistema centraliza a programação cultural do Teatro Acessivel e coloca a **acessibilidade como
funcionalidade central**, e não como complemento: cada espetáculo exibe de forma clara quais recursos
oferece, e o público pode informar suas necessidades específicas com antecedência, permitindo que a
equipe organizadora se planeje adequadamente.

### Objetivos

- Facilitar o acesso às informações dos espetáculos
- Permitir a solicitação prévia de recursos de acessibilidade
- Melhorar a comunicação entre público e organização
- Promover autonomia para pessoas com deficiência
- Centralizar informações acessíveis
- Gerar indicadores sobre demandas de acessibilidade
- Auxiliar o planejamento dos eventos
- Incentivar a participação ativa do público

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Stack utilizada](#-stack-utilizada)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e execução](#-instalação-e-execução)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Rotas da API](#-rotas-da-api)
- [Modelo de dados](#-modelo-de-dados)
- [Acessibilidade da plataforma](#-acessibilidade-da-plataforma)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## ✨ Funcionalidades

| # | Funcionalidade | Descrição |
|---|---|---|
| 1 | **Página inicial** | Eventos em destaque, programação do dia, próximos espetáculos e recursos de acessibilidade disponíveis à primeira vista |
| 2 | **Página individual do espetáculo** | Informações gerais, recursos de acessibilidade, orientações de acesso, localização e contato |
| 3 | **Solicitação de recursos** | Formulário para o público informar previamente necessidades como intérprete de Libras, audiodescrição, espaço para cadeira de rodas, cão-guia, entre outras |
| 4 | **Sistema de avaliações** | Avaliação por critérios (acessibilidade, comunicação, conforto, atendimento, experiência geral) com comentários livres |
| 5 | **Indicadores visuais de acessibilidade** | Selos coloridos por categoria (física, comunicacional, informacional, especializada) em cada espetáculo |
| 6 | **Indicadores de planejamento** | Endpoint que agrega as solicitações recebidas, apoiando o planejamento da equipe organizadora |

## 🛠 Stack utilizada

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- express-validator (validação de dados)

**Frontend**
- React 18 + Vite
- React Router
- Axios
- CSS puro com tokens de design (sem frameworks de UI)

## 📁 Estrutura do projeto

```
teatro-acessivel/
├── backend/
│   ├── config/          # Conexão com o MongoDB
│   ├── models/          # Espetaculo, Solicitacao, Avaliacao
│   ├── controllers/     # Regras de negócio
│   ├── routes/          # Rotas HTTP da API
│   ├── middleware/      # Validação e tratamento de erros
│   ├── seed.js          # Dados de exemplo
│   └── server.js        # Ponto de entrada da API
│
└── frontend/
    └── src/
        ├── pages/        # Home, ListaEspetaculos, EspetaculoDetalhe, Sobre
        ├── components/   # Formulários, cartões, indicadores, inputs acessíveis
        ├── config/       # Configuração central dos recursos de acessibilidade
        ├── api/          # Cliente HTTP (axios)
        └── styles/       # Tokens de design (cores, tipografia, foco)
```

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [MongoDB](https://www.mongodb.com/try/download/community) local ou um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/atlas)
- npm (incluso no Node.js)

## 🚀 Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/<seu-usuario>/teatro-caixa-preta.git
cd teatro-caixa-preta
```

### 1. Backend

```bash
cd backend
cp .env.example .env       # ajuste MONGODB_URI se necessário
npm install
npm run seed                # popula o banco com espetáculos de exemplo
npm run dev                 # API disponível em http://localhost:5000
```

### 2. Frontend

Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                 # aplicação em http://localhost:5173
```

> O Vite já está configurado com proxy de `/api` para `http://localhost:5000`, então nenhuma
> configuração extra é necessária com as portas padrão.

## 🔐 Variáveis de ambiente

**backend/.env**

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta da API | `5000` |
| `MONGODB_URI` | String de conexão do MongoDB | `mongodb://127.0.0.1:27017/teatro_caixa_preta` |
| `CLIENT_URL` | Origem permitida no CORS | `http://localhost:5173` |

**frontend/.env**

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API consumida pelo frontend | `http://localhost:5000/api` |

## 🔌 Rotas da API

### Espetáculos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/espetaculos` | Lista espetáculos (filtros: `destaque`, `recurso`, `busca`) |
| `GET` | `/api/espetaculos/proximos` | Lista os próximos espetáculos programados |
| `GET` | `/api/espetaculos/:id` | Detalhe de um espetáculo, com resumo de avaliações |
| `POST` | `/api/espetaculos` | Cria um espetáculo |
| `PUT` | `/api/espetaculos/:id` | Atualiza um espetáculo |
| `DELETE` | `/api/espetaculos/:id` | Inativa um espetáculo (soft delete) |

### Solicitações de acessibilidade

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/solicitacoes` | Envia uma solicitação prévia de recursos |
| `GET` | `/api/solicitacoes` | Lista solicitações (filtros: `espetaculo`, `status`) |
| `GET` | `/api/solicitacoes/:id` | Detalhe de uma solicitação |
| `GET` | `/api/solicitacoes/indicadores` | Indicadores agregados de demanda por recurso |
| `PUT` | `/api/solicitacoes/:id/status` | Atualiza o status (`pendente`, `confirmada`, `atendida`, `cancelada`) |

### Avaliações

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/avaliacoes` | Registra uma avaliação |
| `GET` | `/api/avaliacoes` | Lista avaliações (filtro: `espetaculo`) |

<details>
<summary>Exemplo de payload — <code>POST /api/solicitacoes</code></summary>

```json
{
  "espetaculo": "64f1a2b3c4d5e6f7a8b9c0d1",
  "nomeSolicitante": "Maria Silva",
  "email": "maria@exemplo.com",
  "telefone": "(41) 99999-0000",
  "quantidadeAcompanhantes": 1,
  "recursos": {
    "interpreteLibras": true,
    "espacoCadeiraDeRodas": true
  },
  "necessidadesIndividualizadas": "Prefiro assento próximo à saída lateral."
}
```
</details>

## 🗃 Modelo de dados

**Espetaculo** — nome, descrição, imagem (com texto alternativo), data, horário, duração,
classificação indicativa, recursos de acessibilidade disponíveis, orientações de acesso, localização
e contato.

**Solicitacao** — vinculada a um espetáculo; dados do solicitante, recursos solicitados,
acompanhantes, necessidades individualizadas e status de atendimento.

**Avaliacao** — vinculada a um espetáculo; notas de 1 a 5 para acessibilidade, comunicação, conforto,
atendimento e experiência geral, além de comentário livre.

## ♿ Acessibilidade da plataforma

Como o próprio sistema tem como finalidade promover inclusão, sua interface segue princípios de
acessibilidade digital:

- **Navegação simplificada** — menu enxuto e link "pular para o conteúdo principal"
- **Contraste adequado** — paleta escura de alto contraste (WCAG)
- **Compatibilidade com leitores de tela** — HTML semântico, `aria-label`, `role="tablist"`/`tabpanel`, `aria-live`
- **Descrição alternativa de imagens** — texto alternativo obrigatório para imagens de divulgação
- **Navegação por teclado** — foco sempre visível; avaliação por estrelas implementada como grupo de rádio, não apenas ícones clicáveis
- **Responsividade** — layout fluido para computadores, tablets e smartphones
- **Linguagem clara** — textos objetivos e mensagens de erro acionáveis
- **Botões acessíveis** — área mínima de toque de 44×44px
- **Organização hierárquica do conteúdo** — uso correto de `h1`–`h3`
- Suporte a `prefers-reduced-motion`

## 🗺 Roadmap

- [ ] Autenticação para a equipe organizadora (rotas administrativas)
- [ ] Painel administrativo para cadastro de espetáculos via interface
- [ ] Notificações por e-mail ao confirmar uma solicitação
- [ ] Leitura automática (text-to-speech) e audiodescrição de conteúdos na própria plataforma
- [ ] Testes automatizados (Jest + React Testing Library)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona minha feature'`)
4. Envie para o seu fork (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais informações.

---

<div align="center">

Desenvolvido para o Teatro Acessivel 🎭 — inclusão como parte do espetáculo, não como coadjuvante.

</div>
