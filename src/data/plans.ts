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
    nick: "Adaga de Inox",
    name: "Gratuito",
    price: "R$ 0",
    per: "/mês",
    tokens: 3,
    tokensLabel: "3 descascadas / mês",
    peelPct: 10,
    accent: "var(--color-banana)",
    accentDeep: "var(--color-bananadeep)",
    cta: "Começar de graça",
    feats: [
      "Descascamento HD ",
      "Melhor que plástico, o guerreiro do dia a dia",
      "Fundo do vegetal por sua conta"
    ],
  },
  {
    id: "mediano",
    nick: "Katana do Hortifruti",
    name: "Mediano",
    price: "R$ 89,99",
    per: "/mês",
    tokens: 50,
    tokensLabel: "50 descascadas / mês",
    peelPct: 60,
    accent: "var(--color-carrot)",
    accentDeep: "var(--color-carrotdeep)",
    cta: "Assinar Mediano",
    feats: [
      "Descascamento Full HD",
      "Descasca como um Samurai",
      "Acompanha bainha tática de brinde",
      "Se não descasca, fereeee 🎵"
    ],
  },
  {
    id: "pro",
    nick: "MasterChef Tiktoker",
    name: "Pro",
    price: "R$ 199,99",
    per: "/mês",
    tokens: 200,
    tokensLabel: "200 descascadas / mês",
    peelPct: 100,
    hot: true,
    accent: "var(--color-carrot)",
    accentDeep: "var(--color-carrotdeep)",
    cta: "Virar MasterChef",
    feats: [
      "Resolução 4K crocante",
      "Gourmet, design moderno, feito para brilhar",
      "Corte Julienne opcional",
      "Suporte com avental",
    ],
  },
  {
    id: "premium",
    nick: "Sabre de Luz Vegano",
    name: "Premium",
    price: "R$ 499,99",
    per: "/mês",
    tokens: Infinity,
    tokensLabel: "Descascadas infinitas",
    peelPct: 100,
    vaporize: false,
    accent: "var(--color-lime)",
    accentDeep: "var(--color-limedeep)",
    cta: "Empunhar o sabre",
    feats: [
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
