interface Step {
  n: string;
  icon: string;
  t: string;
  d: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: "📸",
    t: "Fotografe o vegetal",
    d: "Banana, batata, cenoura, abacaxi. Se tem casca, a gente encara.",
  },
  {
    n: "02",
    icon: "🪙",
    t: "Gaste 1 token",
    d: "Cada descascada custa 1 token de descascamento. Recarregue quando quiser.",
  },
  {
    n: "03",
    icon: "✨",
    t: "Receba descascado",
    d: "Nossa IA devolve a imagem pelada. A qualidade depende do seu plano.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como" className="py-[46px] pb-2">
      <div className="mx-auto max-w-[1180px] px-7">
        <header className="mb-9 flex flex-col items-center gap-3 text-center">
          <span className="pill bg-lime shadow-flat">🔪 Como funciona</span>
          <h2 className="text-[42px] font-extrabold tracking-[-0.025em]">Três passos até a polpa</h2>
        </header>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[24px] border-[3px] border-ink bg-white p-[26px_22px] shadow-flat">
              <span className="font-display text-sm font-extrabold text-carrot">{s.n}</span>
              <span className="my-2 block text-[42px]">{s.icon}</span>
              <h3 className="text-[21px] font-bold">{s.t}</h3>
              <p className="mt-2 text-[15px] text-inksoft text-pretty">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
