"use client";

import type { CSSProperties } from "react";
import { Coins, Check, Zap } from "lucide-react";
import { PLANS, type Plan } from "@/data/plans";

interface PricingProps {
  activePlanId: string;
  onChoose: (plan: Plan) => void;
}

export default function Pricing({ activePlanId, onChoose }: PricingProps) {
  return (
    <section id="planos" className="py-[54px] pb-[60px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <header className="mb-9 flex flex-col items-center gap-3 text-center">
          <span className="pill bg-banana shadow-flat">🪙 Planos & Tokens</span>
          <h2 className="text-[42px] font-extrabold tracking-[-0.025em]">Escolha o seu nível de gume</h2>
          <p className="max-w-[520px] text-[17px] text-inksoft">
            Quanto mais você paga, menos casca sobra. É ciência de bancada.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {PLANS.map((p) => {
            const active = activePlanId === p.id;
            const accentVars = {
              "--accent": p.accent,
              "--accent-deep": p.accentDeep,
            } as CSSProperties;
            return (
              <article
                key={p.id}
                style={accentVars}
                className={
                  "relative flex flex-col rounded-[24px] border-ink bg-white p-[22px_18px] transition hover:-translate-y-1 " +
                  (p.hot
                    ? "z-[2] scale-[1.04] border-[3px] bg-gradient-to-b from-[#FFF4E9] to-white shadow-hot hover:scale-[1.04] hover:-translate-y-1 lg:scale-[1.04] "
                    : "border-[2.5px] shadow-flat ") +
                  (active ? "outline outline-[3px] outline-offset-[3px] outline-lime " : "")
                }
              >
                {p.hot && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border-[2.5px] border-ink bg-carrot px-3 py-[5px] text-xs font-extrabold text-white">
                    <Zap size={13} /> Mais escolhido
                  </span>
                )}
                {active && !p.hot && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border-[2.5px] border-ink bg-lime px-3 py-[5px] text-xs font-extrabold text-[#16320a]">
                    <Check size={13} /> Seu plano
                  </span>
                )}

                <div className="min-h-[18px] text-[13px] font-bold" style={{ color: "var(--accent-deep)" }}>
                  “{p.nick}”
                </div>
                <div className="mt-0.5 font-display text-[22px] font-extrabold">{p.name}</div>

                <div className="my-2.5 flex items-baseline gap-1">
                  <span className="font-display text-[27px] font-extrabold tracking-[-0.02em]">{p.price}</span>
                  <i className="text-[13px] font-semibold not-italic text-muted">{p.per}</i>
                </div>

                <div className="mb-3.5 inline-flex items-center gap-1.5 self-start rounded-full border-2 border-line bg-bg2 px-2.5 py-[5px] text-[13.5px] font-bold">
                  <Coins size={17} style={{ color: "var(--accent-deep)" }} />
                  {p.tokensLabel}
                </div>

                <div
                  className="mb-3.5 rounded-[14px] border-2 border-dashed p-[14px_12px_12px] text-[13.5px] leading-[1.45] text-pretty"
                  style={{
                    borderColor: "var(--accent-deep)",
                    background: "color-mix(in srgb, var(--accent) 16%, #fff)",
                  }}
                >
                  <span
                    className="mb-1.5 block font-display text-[10.5px] font-extrabold uppercase tracking-[0.06em]"
                    style={{ color: "var(--accent-deep)" }}
                  >
                    Como a IA age
                  </span>
                  {p.behavior}
                </div>

                <ul className="mb-[18px] flex flex-1 list-none flex-col gap-2 p-0">
                  {p.feats.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[13.5px] text-inksoft">
                      <Check size={15} className="mt-0.5 shrink-0 text-limedeep" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onChoose(p)}
                  className={
                    "btn w-full justify-center p-3 text-[14.5px] " +
                    (p.hot ? "btn-primary" : active ? "btn-lime" : "")
                  }
                >
                  {active ? "Plano ativo ✓" : p.cta}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
