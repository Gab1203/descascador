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
    nick: "Descascador de Plástico",
    name: "Gratuito",
    price: "R$ 0",
    per: "/mês",
    tokens: 3,
    tokensLabel: "3 tokens / mês",
    peelPct: 10,
    accent: "var(--color-banana)",
    accentDeep: "var(--color-bananadeep)",
    cta: "Começar de graça",
    feats: ["3 descascadas por mês", "Resolução baixa", "Marca d'água de batata"],
  },
  {
    id: "mediano",
    nick: "Descascador de Ouro",
    name: "Mediano",
    price: "R$ 19,90",
    per: "/mês",
    tokens: 50,
    tokensLabel: "50 tokens / mês",
    peelPct: 60,
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
    accent: "var(--color-lime)",
    accentDeep: "var(--color-limedeep)",
    cta: "Empunhar o sabre",
    feats: [
      "Tokens infinitos ♾️",
      "Resolução interdimensional",
      "Vaporiza o que quiser",
      "Pode descascar a si mesmo",
      "Ideal para restaurantes"
    ],
  },
];

export const PRODUCE: Produce[] = [
  { key: "banana", label: "Banana", emoji: "🍌", tint: "#FFC833" },
  { key: "batata", label: "Batata", emoji: "🥔", tint: "#C9954E" },
  { key: "cenoura", label: "Cenoura", emoji: "🥕", tint: "#FF6A2B" },
  { key: "uva", label: "Uva", emoji: "🍇", tint: "#8E6FC7" },
];
