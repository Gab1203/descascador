"use client";

import { useState } from "react";
import { PLANS, type Plan } from "@/data/plans";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Footer from "./Footer";

export default function Descascador() {
  // Estado compartilhado entre navbar, demo e planos.
  const [activePlan, setActivePlan] = useState<Plan>(PLANS[0]); // Lâmina Cega (gratuito)
  const [tokens, setTokens] = useState<number>(PLANS[0].tokens);

  // Gasta 1 token por descascada. Plano infinito nunca decrementa.
  function spendToken(): boolean {
    if (tokens === Infinity) return true;
    if (tokens <= 0) return false;
    setTokens((t) => t - 1);
    return true;
  }

  // Trocar de plano reseta os tokens e rola de volta pra demo ver o efeito.
  function choosePlan(plan: Plan): void {
    setActivePlan(plan);
    setTokens(plan.tokens);
    const demo = document.getElementById("demo");
    if (demo) {
      window.scrollTo({
        top: demo.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <Navbar tokens={tokens} activePlan={activePlan} />
      <main>
        <Hero tokens={tokens} activePlan={activePlan} onSpendToken={spendToken} />
        <HowItWorks />
        <Pricing activePlanId={activePlan.id} onChoose={choosePlan} />
      </main>
      <Footer />
    </>
  );
}
