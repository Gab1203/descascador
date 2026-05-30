// Dados mockados dos planos. O "coração da piada": quanto mais caro, melhor a IA descasca.
// peelPct alimenta o anel de qualidade da demo; vaporize é o easter-egg do plano infinito.

export interface Plan {
  id: string;
  nick: string;
  name: string;
  price: string;
  per: string;
  tokens: number; // pode ser Infinity (plano Premium)
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

export const PLANS: Plan[] = [
  {
    id: "free",
    nick: "Lâmina Cega",
    name: "Gratuito",
    price: "R$ 0",
    per: "/mês",
    tokens: 3,
    tokensLabel: "3 tokens / mês",
    peelPct: 10,
    behavior: "Descasca apenas 10%. Basicamente só arranha a casca.",
    accent: "var(--color-banana)",
    accentDeep: "var(--color-bananadeep)",
    cta: "Começar de graça",
    feats: ["3 descascadas por mês", "Resolução baixa", "Marca d'água de batata"],
  },
  {
    id: "inicial",
    nick: "Faca de Serra de Pão",
    name: "Inicial",
    price: "R$ 9,90",
    per: "/mês",
    tokens: 20,
    tokensLabel: "20 tokens / mês",
    peelPct: 30,
    behavior: "Descasca 30%, mas tira um pedaço da polpa junto porque a faca é ruim.",
    accent: "var(--color-lime)",
    accentDeep: "var(--color-limedeep)",
    cta: "Assinar Inicial",
    feats: ["20 descascadas por mês", "Resolução média", "Perde ~15% da polpa"],
  },
  {
    id: "mediano",
    nick: "Descascador de Feira",
    name: "Mediano",
    price: "R$ 19,90",
    per: "/mês",
    tokens: 50,
    tokensLabel: "50 tokens / mês",
    peelPct: 60,
    behavior: "Descasca 60%. Fica bom, mas esquece o fundo do vegetal.",
    accent: "var(--color-carrot)",
    accentDeep: "var(--color-carrotdeep)",
    cta: "Assinar Mediano",
    feats: ["50 descascadas por mês", "Alta resolução", "Fundo do vegetal por sua conta"],
  },
  {
    id: "pro",
    nick: "MasterChef Tiktoker",
    name: "Pro",
    price: "R$ 49,90",
    per: "/mês",
    tokens: 200,
    tokensLabel: "200 tokens / mês",
    peelPct: 100,
    hot: true,
    behavior: "100% descascado perfeitamente. Corte Julienne opcional.",
    accent: "var(--color-carrot)",
    accentDeep: "var(--color-carrotdeep)",
    cta: "Virar MasterChef",
    feats: [
      "200 descascadas por mês",
      "Resolução 4K crocante",
      "Corte Julienne opcional",
      "Suporte com avental",
    ],
  },
  {
    id: "premium",
    nick: "Sabre de Luz Vegano",
    name: "Premium",
    price: "R$ 99,90",
    per: "/mês",
    tokens: Infinity,
    tokensLabel: "Tokens infinitos",
    peelPct: 100,
    vaporize: true,
    behavior: "Descasca até o que não tem casca. Já vaporizou uma uva.",
    accent: "var(--color-lime)",
    accentDeep: "var(--color-limedeep)",
    cta: "Empunhar o sabre",
    feats: [
      "Tokens infinitos ♾️",
      "Resolução interdimensional",
      "Vaporiza o que quiser",
      "Pode descascar a si mesmo",
    ],
  },
];

export const PRODUCE: Produce[] = [
  { key: "banana", label: "Banana", emoji: "🍌", tint: "#FFC833" },
  { key: "batata", label: "Batata", emoji: "🥔", tint: "#C9954E" },
  { key: "cenoura", label: "Cenoura", emoji: "🥕", tint: "#FF6A2B" },
  { key: "uva", label: "Uva", emoji: "🍇", tint: "#8E6FC7" },
];
