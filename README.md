SafeTalk – Projeto sobre Violência Doméstica
📌 Sobre o Projeto

O SafeTalk é uma aplicação desenvolvida com o objetivo de combater a violência doméstica por meio da tecnologia.
A plataforma permite que usuários realizem denúncias seguras e anônimas, tenham acesso a informações de apoio e possam encontrar redes de proteção.

O sistema foi construído como parte de um projeto acadêmico de Design Profissional, integrando front-end, back-end e banco de dados em uma aplicação completa.

🚀 Tecnologias Utilizadas
🔹 Back-end

Node.js + Express

MongoDB (com Mongoose)

Autenticação JWT

Estrutura baseada em Controllers, Models e Routes

Arquivos principais:

server.js → inicialização do servidor

src/config/db.js → conexão com o banco

src/controllers → lógica de autenticação e relatórios

src/models → modelos de usuários e denúncias

src/routes → rotas de autenticação e denúncias

🔹 Banco de Dados

Modelos em banco_dados/models/

Conexão configurada em banco_dados/src/config/mongoose.js

🔹 Front-end

React + TypeScript

Vite para build

TailwindCSS para estilização

Estrutura de componentes reutilizáveis

Arquivos principais:

index.html → página base

src/App.tsx → componente principal

src/components/ → estrutura de integração com backend

tailwind.config.ts → configuração do Tailwind

⚙️ Como Rodar o Projeto
🔧 Back-end
cd back_end/app-backend
npm install
npm start


O servidor será iniciado (porta definida em server.js).

💻 Front-end
cd front_end/trabalhodesignprofissional/safetalk-structure-main
npm install
npm run dev


O projeto abrirá no navegador em http://localhost:5173 (ou similar).

📂 Estrutura do Projeto
projeto_design_profissional-main/
│── back_end/              # API em Node.js
│   └── app-backend/
│       ├── src/
│       │   ├── config/    # Configuração de banco
│       │   ├── controllers/ # Lógica de autenticação e relatórios
│       │   ├── middleware/  # Middlewares (auth, erros)
│       │   ├── models/      # Modelos de dados
│       │   └── routes/      # Rotas da API
│── banco_dados/           # Estrutura do banco MongoDB
│── front_end/             # Aplicação React + Tailwind
│   └── trabalhodesignprofissional/safetalk-structure-main/
│       ├── public/        # Assets públicos
│       ├── src/           # Código-fonte React
│       └── package.json   # Dependências

🎯 Objetivos do Projeto

Conscientizar sobre a violência doméstica.

Criar um canal seguro para denúncias.

Disponibilizar informações de apoio e acolhimento.

Integrar front-end, back-end e banco de dados em uma solução prática.

👥 Equipe

Este projeto foi desenvolvido como parte da disciplina de Design Profissional, com foco em soluções tecnológicas para problemas sociais.

Você quer que eu já gere o arquivo README.md dentro da pasta do projeto para você baixar, ou prefere que eu apenas te entregue o conteúdo aqui? 

Você disse:
entregue o conteudo por favor 
O ChatGPT disse:

Perfeito 🚀 Aqui está o conteúdo pronto do README.md que você pode colar direto no seu projeto:

# SafeTalk – Projeto sobre Violência Doméstica

## 📌 Sobre o Projeto
O **SafeTalk** é uma aplicação desenvolvida com o objetivo de **combater a violência doméstica** por meio da tecnologia.  
A plataforma permite que usuários realizem **denúncias seguras e anônimas**, tenham **acesso a informações de apoio** e possam encontrar **redes de proteção**.  

O sistema foi construído como parte de um projeto acadêmico de **Design Profissional**, integrando **front-end, back-end e banco de dados** em uma aplicação completa.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Back-end
- **Node.js** + **Express**
- **MongoDB** (com **Mongoose**)
- Autenticação JWT
- Estrutura baseada em **Controllers, Models e Routes**

Arquivos principais:
- `server.js` → inicialização do servidor
- `src/config/db.js` → conexão com o banco
- `src/controllers` → lógica de autenticação e relatórios
- `src/models` → modelos de usuários e denúncias
- `src/routes` → rotas de autenticação e denúncias

### 🔹 Banco de Dados
- Modelos em `banco_dados/models/`
- Conexão configurada em `banco_dados/src/config/mongoose.js`

### 🔹 Front-end
- **React + TypeScript**
- **Vite** para build
- **TailwindCSS** para estilização
- Estrutura de componentes reutilizáveis

Arquivos principais:
- `index.html` → página base
- `src/App.tsx` → componente principal
- `src/components/` → estrutura de integração com backend
- `tailwind.config.ts` → configuração do Tailwind

---

## ⚙️ Como Rodar o Projeto

### 🔧 Back-end
```bash
cd back_end/app-backend
npm install
npm start


O servidor será iniciado (porta definida em server.js).

💻 Front-end
cd front_end/trabalhodesignprofissional/safetalk-structure-main
npm install
npm run dev


O projeto abrirá no navegador em http://localhost:5173 (ou similar).

📂 Estrutura do Projeto
projeto_design_profissional-main/
│── back_end/              # API em Node.js
│   └── app-backend/
│       ├── src/
│       │   ├── config/      # Configuração de banco
│       │   ├── controllers/ # Lógica de autenticação e relatórios
│       │   ├── middleware/  # Middlewares (auth, erros)
│       │   ├── models/      # Modelos de dados
│       │   └── routes/      # Rotas da API
│── banco_dados/           # Estrutura do banco MongoDB
│── front_end/             # Aplicação React + Tailwind
│   └── trabalhodesignprofissional/safetalk-structure-main/
│       ├── public/        # Assets públicos
│       ├── src/           # Código-fonte React
│       └── package.json   # Dependências

🎯 Objetivos do Projeto

Conscientizar sobre a violência doméstica.

Criar um canal seguro para denúncias.

Disponibilizar informações de apoio e acolhimento.

Integrar front-end, back-end e banco de dados em uma solução prática.

👥 Equipe

Este projeto foi desenvolvido como parte da disciplina de Design Profissional, com foco em soluções tecnológicas para problemas sociais.
