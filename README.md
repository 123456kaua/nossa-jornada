# Nossa Jornada com Deus ✦

> Plano devocional para dois — 276 dias, 30 março → 31 dezembro 2026

---

## O que é isso

Um **web app progressivo (PWA)** completo construído com **Next.js 14**, projetado para acompanhar um casal numa jornada devocional de 276 dias cobrindo toda a Bíblia em ordem temática.

Inclui também um **gerador de PDF em Python** para quem prefere ter o caderno impresso.

---

## Estrutura do projeto

```
nossa-jornada/
├── src/
│   ├── app/
│   │   ├── layout.tsx          — Layout raiz com metadados e fontes
│   │   └── page.tsx            — Página principal (shell do app)
│   ├── components/
│   │   ├── Hero.tsx            — Header com gradiente escuro e animação
│   │   ├── ProgressBar.tsx     — Barra de progresso com marcos em 25/50/75/100%
│   │   ├── FilterBar.tsx       — Filtros por status e testamento + busca
│   │   ├── DayCard.tsx         — Card expansível com reflexão e oração
│   │   ├── BlocoHeader.tsx     — Separador visual por bloco temático
│   │   └── SyncBadge.tsx       — Código do casal para sincronização
│   ├── lib/
│   │   ├── data.ts             — 276 dias de dados (28 completos + 248 estruturados)
│   │   ├── supabase.ts         — Cliente Supabase + realtime + SQL de setup
│   │   └── useProgress.ts      — Hook: localStorage + merge Supabase
│   └── styles/
│       └── globals.css         — Fontes, variáveis CSS, scrollbar, animações
├── public/
│   ├── favicon.ico
│   ├── favicon-32.png          — Foto do casal como ícone (todos os tamanhos)
│   ├── favicon-180.png         — Apple touch icon
│   ├── favicon-192.png         — Android icon
│   ├── favicon-512.png         — PWA icon
│   └── manifest.json           — PWA manifest
├── gerar_pdf.py                — Gerador de PDF elegante em Python
├── .env.example                — Template de variáveis de ambiente
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir http://localhost:3000
```

O app funciona **sem nenhuma configuração adicional** — o progresso fica salvo no `localStorage`.

---

## Sync em tempo real entre os dois celulares (Supabase)

Para sincronizar o progresso entre os dois dispositivos do casal em tempo real:

### 1. Criar conta no Supabase

Acesse [supabase.com](https://supabase.com) e crie um projeto gratuito.

### 2. Criar a tabela

No **SQL Editor** do Supabase, execute:

```sql
create table couple_progress (
  id uuid default gen_random_uuid() primary key,
  couple_id text not null,
  day_number int not null,
  completed_at timestamptz default now(),
  completed_by text,
  unique(couple_id, day_number)
);

-- Ativar realtime (essencial para o sync funcionar)
alter publication supabase_realtime add table couple_progress;
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Compartilhar o código do casal

No app, copie o **Código do casal** (visível no topo da lista) e compartilhe com o parceiro. Ambos devem colar o mesmo código em `localStorage` — ou simplesmente usar o mesmo dispositivo no início para que o código seja sincronizado automaticamente.

---

## Gerar o PDF devocional

```bash
# Instalar dependências Python
pip install reportlab Pillow

# Gerar o PDF
python3 gerar_pdf.py
```

O arquivo `nossa_jornada_devocional.pdf` será gerado na pasta do projeto.

### Estrutura do PDF

| Seção | Descrição |
|---|---|
| **Capa** | Título, nomes das datas, versículo âncora (Ecl 4:12) |
| **Introdução** | Como usar o plano, os 10 blocos temáticos, legenda |
| **Dias 1–28** | Cada dia completo: tema, referência, reflexão, oração, linhas para anotação |
| **Índice bíblico** | Onde cada livro aparece no plano, em duas colunas |
| **Página de chegada** | Em branco para escreverem juntos no dia 31/12 |

---

## Deploy (Vercel — grátis)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Configurar variáveis de ambiente na dashboard da Vercel
# Settings → Environment Variables → adicionar as duas vars do Supabase
```

Ou simplesmente conecte o repositório no [vercel.com](https://vercel.com) e configure as variáveis pelo painel.

---

## Os 10 Blocos Temáticos

| Bloco | Tema | Dias |
|---|---|---|
| 1 | **Fundamentos** — Criação, identidade, aliança, sabedoria | 1–28 |
| 2 | **Jornada e Fé** — Êxodo, Hebreus, João, Salmos | 29–56 |
| 3 | **Habitação e Presença** — Tabernáculo, Apocalipse 21, João 14–17 | 57–84 |
| 4 | **Profetas e Promessa** — Isaías, Jeremias, Ezequiel, Paulo | 85–112 |
| 5 | **Os Evangelhos** — Marcos, Lucas, João | 113–140 |
| 6 | **Sabedoria Prática** — Provérbios, Eclesiastes, Tiago | 141–168 |
| 7 | **Cartas e Comunidade** — Paulo, Pedro, João | 169–196 |
| 8 | **Escritos Históricos** — Samuel, Reis, Crônicas | 197–224 |
| 9 | **Salmos e Oração** — 150 Salmos temáticos | 225–252 |
| 10 | **Chegada** — Mateus 24–28, Hebreus 11–13, Apocalipse | 253–276 |

---

> *"E se alguém puder vencer um só, dois resistirão contra ele;*  
> *o cordão de três dobras não se rompe facilmente."*  
> — Eclesiastes 4:12
