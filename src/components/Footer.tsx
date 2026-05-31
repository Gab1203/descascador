interface FooterCol {
  title: string;
  links: string[];
}

const COLS: FooterCol[] = [
  { title: "Produto", links: ["Testar", "Planos", "Como funciona"] },
  { title: "Empresa", links: ["Sobre", "Carreiras 🍌", "Imprensa"] },
  { title: "Legal", links: ["Termos", "Privacidade", "Cookies (de polvilho)"] },
];

export default function Footer() {
  return (
    <footer className="mt-2.5 bg-ink px-0 pb-[26px] pt-12 text-[#F3E9D8]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-10 border-b-2 border-white/10 px-7 pb-[30px]">
        <div className="mt-[20px]">
          <span className="flex items-center gap-2 font-display text-[21px] font-extrabold text-white">
            <span className="text-2xl">🥔</span> Descascador
          </span>
          <p className="mt-2.5 max-w-[280px] text-[14.5px] text-[#B6A892]">
            Descascamos sua banana desde 2026.
          </p>
        </div>

        <div className="flex flex-wrap gap-[54px]">
          {COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5 text-[14.5px]">
              <b className="mb-1 font-display text-[13px] uppercase tracking-[0.05em] text-white">
                {col.title}
              </b>
              {col.links.map((l) => (
                <a key={l} href="#" className="text-[#B6A892] hover:text-banana">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-4 px-7 pt-[22px] text-[13.5px] text-[#9C8E78]">
        <span>© 2026 Descascador Ltda.</span>
        <span className="font-bold text-banana">
          ⚠️ Nenhum dedo foi cortado na produção deste software.
        </span>
      </div>
    </footer>
  );
}
