# 🥔 Descascador

Landing page interativa do **Descascador** — você faz upload de uma fruta/legume, gasta **Tokens de Descascamento** e a IA devolve o alimento descascado. Dependendo do plano, o descascamento é perfeito... ou propositalmente péssimo.

Construído com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** e **Lucide React**.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
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

## Plugando a IA de verdade 

A demo hoje é **mockada**: o `peel()` em `Hero.tsx` só espera 2,2s e mostra um resultado simulado. Para conectar o modelo real:

1. Crie uma rota `src/app/api/peel/route.ts` que recebe a imagem (base64) + o `peelPct` do plano e chama o `gemini-2.5-flash-image` com um prompt do tipo _"remova X% da casca deste alimento"_.
2. Em `Hero.tsx`, troque o `setTimeout(...)` dentro de `peel()` por um `await fetch("/api/peel", { ... })` e guarde a imagem retornada no estado para exibir no painel "Descascado".
3. O `peelPct` / `vaporize` de cada plano (em `data/plans.ts`) já controla a "qualidade" — passe-os no prompt.

> ⚠️ Nenhum dedo foi cortado na produção deste software.
