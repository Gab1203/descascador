# 🥔 Descascador

Landing page interativa do **Descascador** — você faz upload de uma fruta/legume, gasta **Tokens de Descascamento** e a IA devolve o alimento descascado. Dependendo do plano, o descascamento é perfeito... ou propositalmente péssimo.

Construído com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Lucide React**, **Python** e **FastAPI**.

## Rodando o frontend projeto

Crie e edite o arquivo de variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

Depois instale as dependências e execute o projeto:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Rodando o backend do projeto

Crie e ative o ambiente virtual do Python

- Linux/MacOS

```bash
python -m venv .venv
. .venv/bin/activate

```

- Windows

```bash
python -m venv .venv
.\venv\Scripts\Activate.ps1
```

Entre no diretório da API

```bash
cd api
```

Configure as variáveis de ambiente do projeto

```bash
cp .env.example .env
```

*Nota*: `GEMINI_API_KEY` é obrigatória e deve ser definida para uma chave de API do Gemini com suporte a geração de imagens com o NanoBanana 2

Depois instale as dependências e execute o projeto:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## Estrutura

```
# Frontend
src/
├── app/
│   ├── globals.css      # Tailwind v4 + design tokens (@theme) + animações
│   ├── layout.tsx       # fontes (Bricolage Grotesque + Hanken Grotesk) + metadata
│   └── page.tsx         # renderiza <Descascador />
├── components/
│   ├── Descascador.tsx  # root client — estado de tokens + plano ativo
│   ├── Navbar.tsx       # logo, contador de tokens, login/avatar
│   ├── Hero.tsx         # dropzone + máquina de estados do upload + antes/depois
│   ├── HowItWorks.tsx   # 3 passos
│   ├── Pricing.tsx      # 5 planos (Pro destacado) — o coração da piada
│   └── Footer.tsx       # rodapé + aviso legal
└── data/
    └── plans.ts         # PLANS / PRODUCE + tipos Plan e Produce

# API Backend
api/
├── models/
│   └── peel_request.py  # Schema da requisição para descascar o legume
├── config.py            # Arquivo de definição das variáveis de ambiente
└── main.py              # Raiz do projeto FastAPI
```

## Tipos

Em `src/data/plans.ts`:

```ts
export interface Plan {
  id: string;
  nick: string;
  name: string;
  price: string;
  per: string;
  tokens: number;      // pode ser Infinity (Premium)
  tokensLabel: string;
  peelPct: number;
  behavior: string;
  accent: string;
  accentDeep: string;
  cta: string;
  feats: string[];
  hot?: boolean;
  vaporize?: boolean;
}

export interface Produce {
  key: string;
  label: string;
  emoji: string;
  tint: string;
}
```

Todos os componentes têm props tipadas (`HeroProps`, `NavbarProps`, `PricingProps`, etc.).

## Design system

Tokens definidos em `globals.css` via `@theme` (Tailwind v4) — use como utilitários:

| Token    | Cor       | Uso                    |
| -------- | --------- | ---------------------- |
| `carrot` | `#FF6A2B` | ação principal         |
| `lime`   | `#7BC23A` | sucesso / plano ativo  |
| `banana` | `#FFC833` | destaque / tokens      |
| `ink`    | `#2A2017` | texto / contornos      |
| `bg`     | `#FFF7EC` | fundo                  |

Estilo: cartões com contorno grosso + sombra sólida, cantos arredondados, dois pesos de fonte. Helpers `.btn`, `.btn-primary`, `.pill`, `.checker` e animações (`.animate-bob`, `.animate-chop`, etc.) ficam em `globals.css`.
