Com base em toda a documentação que revisamos (Arquitetura, Modelagem e Backlog), preparei um **README.md** profissional, focado em destacar suas habilidades técnicas para recrutadores e o valor de negócio do **EcoTrack**.

---

# 📝 README.md

# 🟢 EcoTrack - API de Gestão Inteligente de Validade

O **EcoTrack** é uma REST API desenvolvida para resolver um dos maiores gargalos financeiros de pequenos varejistas e estabelecimentos alimentícios: o **prejuízo por vencimento de estoque**.

Diferente de sistemas de inventário comuns, o EcoTrack foca na "vida útil" do produto, oferecendo inteligência de dados para transformar datas de validade em ações estratégicas de vendas ou descarte, calculando o impacto financeiro em tempo real.

---

## 🚀 O Problema e a Solução

### **A Dor**

Muitos empreendedores perdem dinheiro silenciosamente porque não possuem visibilidade sobre quais lotes estão vencendo. O controle manual em planilhas é falho, não emite alertas e não quantifica o prejuízo acumulado.

### **A Solução**

Uma API robusta que gerencia o relacionamento entre **Produtos** e seus múltiplos **Lotes**. O sistema categoriza automaticamente os itens em:

* 🔴 **CRÍTICO:** Já vencidos (Prontos para descarte/cálculo de perda).
* 🟡 **ALERTA:** Vencem em até 7 dias (Ideal para promoções relâmpago).
* 🟢 **OK:** Validade segura.

---

## 🛠️ Stack Tecnológica

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Banco de Dados:** MySQL 8.0 (Relacional)
* **ORM/Query Builder:** Sequelize / `mysql2`
* **Arquitetura:** MVC (Model-View-Controller)
* **Infraestrutura:** AWS EC2 (Hospedagem em instância Linux)

---

## 🏗️ Arquitetura e Modelagem

O projeto utiliza uma estrutura **1:N (Um para Muitos)**, permitindo que um único produto (ex: Iogurte Morango) tenha vários lotes com datas de validade e quantidades distintas.

### Diagrama de Dados Simplificado:

* **Products:** `id`, `name`, `category`, `unit_price`, `created_at`
* **Batches (Lotes):** `id`, `ProductId (FK)`, `quantity`, `expiry_date`, `status`

---

## 🛣️ Endpoints Principais (API Design)

### **Produtos**

* `POST /products` - Cadastra um novo item no catálogo.
* `GET /products` - Lista produtos com a soma total de todos os seus lotes ativos.

### **Gestão de Lotes & Inteligência**

* `POST /batches` - Adiciona um novo lote (quantidade + validade) a um produto.
* `GET /inventory/status` - **O Motor de Cálculo:** Retorna os lotes com os status calculados (OK, ALERTA, CRÍTICO).
* `GET /reports/losses` - **Impacto Financeiro:** Soma o prejuízo total (Quantidade Vencida × Preço de Custo).
* `PATCH /batches/:id/discard` - Marca um lote como descartado, alimentando o relatório de perdas.

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/ecotrack.git

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz com as credenciais do seu MySQL:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=ecotrack
PORT=3000

```


4. **Inicie o servidor:**
```bash
npm start

```



---

## 🌟 Diferenciais Técnicos

* **Lógica de Negócio Centralizada:** O status de validade não é estático no banco; ele é calculado dinamicamente com base na data atual, garantindo dados sempre frescos.
* **Tratamento de Erros:** Middlewares para validação de campos obrigatórios e integridade referencial.
* **Pronto para Produção:** Estrutura preparada para deployment em instâncias AWS utilizando PM2 para gerenciamento de processos.

---

> **Desenvolvido por Edoardo Rocha Paz** > *Estudante de Sistemas de Informação - UNI7*

---