import { Coins, UserCircle2 } from "lucide-react";
import type { Plan } from "@/data/plans";

interface NavbarProps {
  tokens: number;
  activePlan: Plan;
}

export default function Navbar({ tokens, activePlan }: NavbarProps) {
  const tk = tokens === Infinity ? "∞" : tokens;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1180px] items-center gap-6 px-7">
        <a href="#top" className="flex items-center gap-2 font-display text-[21px] font-extrabold tracking-tight">
          <span className="animate-wiggle text-2xl">🥔</span>
          <span>Descascador</span>
        </a>

        <nav className="ml-2 hidden gap-7 text-[15px] font-semibold text-inksoft md:flex">
          <a href="#como" className="hover:text-carrotdeep">Como funciona</a>
          <a href="#planos" className="hover:text-carrotdeep">Planos</a>
          <a href="#demo" className="hover:text-carrotdeep">Testar</a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div
            title={`Plano atual: ${activePlan.nick}`}
            className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-banana px-3.5 py-2 font-extrabold shadow-flat"
          >
            <Coins size={18} className="text-bananadeep" />
            <span className="font-display text-[17px] leading-none">{tk}</span>
            <span className="hidden text-[13px] sm:inline">Tokens</span>
          </div>

          <button className="btn btn-ghost text-[15px]">
            <UserCircle2 size={20} />
            <span className="hidden sm:inline">Entrar</span>
          </button>

          <div className="grid h-[42px] w-[42px] place-items-center rounded-full border-[2.5px] border-ink bg-lime text-xl shadow-flat">
            🧑‍🍳
          </div>
        </div>
      </div>
    </header>
  );
}
