# 🟢 EcoTrack - Gestão Inteligente de Validade e Inventário

O **EcoTrack** é uma solução de backend desenvolvida para resolver um dos maiores problemas do pequeno varejo: o desperdício de produtos por vencimento. A API permite o controle rigoroso de lotes, automatiza o status de validade e gera relatórios de impacto financeiro, tudo sob uma arquitetura segura e multiusuário.

## 🚀 Funcionalidades Principais

* **Autenticação JWT:** Sistema completo de registro e login com senhas criptografadas via `bcryptjs`.
* **Gestão de Lotes (Batches):** Controle individual de quantidades e datas de validade por produto.
* **Motor de Status Automático:** A API calcula dinamicamente a situação de cada lote a cada consulta:
* 🔴 **Crítico:** Lotes já vencidos.
* 🟡 **Alerta:** Vencimento em até 7 dias.
* 🟢 **Ok:** Prazo de validade seguro.


* **Relatório de Prejuízo:** Cálculo automático do valor financeiro perdido com lotes descartados, baseado no preço unitário do produto.
* **Isolamento de Dados:** Cada usuário autenticado possui acesso exclusivo aos seus próprios produtos e lotes (Proteção contra IDOR).

---

## 🛠️ Stack Tecnológica

* **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
* **Framework:** [Express.js](https://expressjs.com/)
* **ORM:** [Sequelize](https://sequelize.org/)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Segurança:** JSON Web Tokens (JWT) & Bcryptjs

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura baseada em **Camadas (Layered Architecture)**, garantindo a separação de responsabilidades e facilitando a manutenção:

1. **Controller:** Gerencia as requisições HTTP e as respostas.
2. **Service:** Contém toda a lógica de negócio (cálculos de datas, validações de posse).
3. **Repository:** Isola o acesso ao banco de dados (Sequelize), facilitando futuras trocas de banco.
4. **Model:** Define as entidades do banco de dados e seus relacionamentos (User 1:N Product 1:N Batch).

---

## 🛣️ Endpoints da API

### Usuários (`/users`)

* `POST /register`: Cadastro de novo usuário.
* `POST /login`: Autenticação e retorno do Token.

### Produtos (`/products`) - *Requer Auth*

* `POST /`: Cadastra um novo produto (nome, preço unitário, etc).
* `GET /`: Lista produtos do usuário logado.
* `DELETE /:id`: Remove produto e seus lotes associados.

### Lotes (`/batches`) - *Requer Auth*

* `POST /`: Adiciona um lote a um produto existente.
* `GET /inventory/status`: Lista lotes com status de validade atualizado.
* `PATCH /:id/discard`: Marca um lote como descartado.
* `GET /reports/losses`: Retorna o valor total de prejuízo formatado em BRL.

---

## ⚙️ Como Executar

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/ecotrack.git

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure o ambiente:**
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=ecotrack
AUTH_SECRET=sua_chave_secreta_jwt

```


4. **Inicie o servidor:**
```bash
npm start

```
