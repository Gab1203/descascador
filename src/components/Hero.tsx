"use client";

import { useState, useRef, type ReactNode } from "react";
import {
  Sparkles,
  ArrowRight,
  Scissors,
  RefreshCw,
  Upload,
  Check,
  AlertCircle,
} from "lucide-react";
import { PLANS, PRODUCE, type Plan } from "@/data/plans";

type Stage = "idle" | "ready" | "peeling" | "done";

interface HeroProps {
  tokens: number;
  activePlan: Plan;
  onSpendToken: () => boolean;
  onChoosePlan: (plan: Plan) => void;
  onRefundToken: () => void;
}

function QualityRing({ pct, tint }: { pct: number; tint: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className="absolute bottom-2 right-2 rounded-full border-2 border-ink bg-white"
    >
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(42,32,23,.12)" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke={tint}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
        transform="rotate(-90 32 32)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fontFamily="var(--font-display)"
        fill="var(--color-ink)"
      >
        {pct}%
      </text>
    </svg>
  );
}

export default function Hero({ tokens, activePlan, onSpendToken, onChoosePlan, onRefundToken }: HeroProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeProduce = PRODUCE[0];
  const noTokens = tokens !== Infinity && tokens <= 0;

  function handleFile(f: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setFile(f);
      setApiError(null);
      setStage("ready");
    };
    reader.readAsDataURL(f);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  async function peel() {
    if (stage !== "ready" || !file || !previewUrl) return;
    if (!onSpendToken()) return;
    setStage("peeling");
    setApiError(null);

    const base64 = previewUrl.split(",")[1];
    const imageType = file.type.replace("image/", "");

    try {
      const res = await fetch("/api/peel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: base64, image_type: imageType, plan: activePlan.id }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResultUrl(`data:image/png;base64,${data.output_image_base64}`);
      setStage("done");
    } catch (err) {
      onRefundToken();
      setApiError(err instanceof Error ? err.message : "Erro ao processar imagem");
      setStage("ready");
    }
  }

  function reset() {
    setStage("idle");
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setApiError(null);
  }

  return (
    <section id="top" className="py-[54px] pb-[30px]">
      <div className="text-center mx-auto max-w-[1180px] grid-cols-1 items-center gap-12 px-7">
        {/* ---- Copy ---- */}
        <div>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink bg-white px-3.5 py-[7px] text-[13.5px] font-bold text-carrotdeep shadow-flat">
            <Sparkles size={16} /> Descascamento com IA, nível chef
          </span>

          <h1 className="mt-5 text-[clamp(38px,6vw,58px)] font-extrabold tracking-[-0.03em]">
            Descascamos sua banana.
            <br />
            <span className="relative whitespace-nowrap text-carrotdeep">
              E sua batata também.
              <span className="absolute -left-0.5 -right-0.5 bottom-1.5 -z-10 h-3.5 -rotate-1 rounded-md bg-banana" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[480px] text-[18.5px] text-inksoft text-pretty">
            Faça upload de um vegetal, gaste seus tokens e deixe nossa IA tirar a
            casca pra você. Sem facas, sem dedos cortados, sem desculpas.
          </p>

          <div className="justify-center mt-7 flex flex-wrap gap-5">
            <a href="#demo" className="btn btn-primary btn-lg">
              Descascar agora <ArrowRight size={18} />
            </a>
            <a href="#planos" className="btn btn-lg">
              Ver planos
            </a>
          </div>

          <div className="justify-center mt-8 flex items-center gap-5">
            <Stat value="1.2M" label="Cascas Removidas" />
            <Divider />
            <Stat value="0" label="Dedos Cortados" />
            <Divider />
            <Stat value="4.9★" label="Nota dos Chefs" />
          </div>
        </div>
      </div>

      {/* ---- Demo card ---- */}
      <div id="demo" className="mx-[30px] mt-[50px] rounded-[30px] border-[3px] border-ink bg-surface p-5 shadow-chunky">

        {/* Cabeçalho com select de plano */}
        <div className="mb-5 flex flex-col items-center justify-center gap-2.5">
          <span className="font-display text-base font-extrabold text-center">🔪 Bancada de descascamento</span>
          <select
            value={activePlan.id}
            onChange={(e) => {
              const plan = PLANS.find((p) => p.id === e.target.value);
              if (plan) onChoosePlan(plan);
            }}
            className="cursor-pointer rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-xs font-bold"
          >
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.nick}
              </option>
            ))}
          </select>
        </div>

        {/* ---- IDLE: dropzone ---- */}
        {stage === "idle" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={
                "cursor-pointer rounded-[22px] border-[3px] border-dashed px-6 py-[46px] text-center transition " +
                (dragOver
                  ? "scale-[1.01] border-carrot bg-[#FFEAD6]"
                  : "border-[#D9C9B0] bg-gradient-to-b from-[#FFFBF4] to-[#FFF6E9] hover:border-carrot hover:bg-[#FFF3E6]")
              }
            >
              <div className="mx-auto mb-3.5 grid h-[62px] w-[62px] place-items-center rounded-full border-[2.5px] border-ink bg-banana shadow-flat">
                <Upload size={30} />
              </div>
              <p className="font-display text-[19px] font-bold">
                Arraste seu {activeProduce.label.toLowerCase()} aqui
              </p>
              <p className="mt-1.5 text-[13.5px] font-medium text-muted">
                ou clique para escolher um arquivo · PNG, JPG até 10MB
              </p>
            </div>
          </>
        )}

        {/* ---- READY: preview + peel button ---- */}
        {stage === "ready" && (
          <div className="flex flex-col items-center gap-4">
            <div className="checker relative h-[300px] w-fit overflow-hidden rounded-[20px] border-[2.5px] border-ink">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Imagem original"
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="animate-bob text-[120px] leading-none drop-shadow-[0_10px_14px_rgba(42,32,23,.22)]">
                  {activeProduce.emoji}
                </span>
              )}
              <span className="absolute bottom-2.5 left-3 rounded-lg border-2 border-ink bg-white px-2.5 py-[3px] text-xs font-bold text-inksoft">
                {file?.name ?? "original.jpg"}
              </span>
            </div>

            {apiError && (
              <div className="flex w-full items-center gap-2 rounded-[14px] border-2 border-red-400 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <button onClick={peel} disabled={noTokens} className="btn btn-primary btn-lg w-full justify-center">
              <Scissors size={20} />
              {noTokens ? "Sem tokens! Faça upgrade" : "Descascar (Custa 1 Token)"}
            </button>
            {noTokens && (
              <p className="text-center text-[13.5px] font-medium text-muted">
                Seus tokens acabaram. Escolha um plano abaixo 👇
              </p>
            )}
          </div>
        )}

        {/* ---- PEELING: loader ---- */}
        {stage === "peeling" && (
          <div className="flex flex-col items-center gap-2 px-2.5 py-8">
            <div className="relative mb-1.5 grid h-[90px] place-items-center">
              <span className="animate-chop absolute left-[54%] top-0 text-[46px]">🔪</span>
              <span className="text-[54px]">{activeProduce.emoji}</span>
            </div>
            <p className="mt-1 font-display text-[21px] font-extrabold">Afiando as facas...</p>
            <p className="text-[13.5px] font-medium text-muted">Removendo a casca pixel por pixel</p>
            <div className="mt-2.5 h-3 w-3/4 overflow-hidden rounded-full border-2 border-ink bg-[#F0E6D6]">
              <i className="animate-loadbar block h-full w-[40%] bg-[repeating-linear-gradient(45deg,var(--color-carrot),var(--color-carrot)_8px,var(--color-carrotdeep)_8px,var(--color-carrotdeep)_16px)]" />
            </div>
          </div>
        )}

        {/* ---- DONE: before / after ---- */}
        {stage === "done" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
              <Panel label="Original">
                {previewUrl ? (
                  <img src={previewUrl} alt="Original" className="h-full w-full object-contain animate-pop" />
                ) : (
                  <span className="animate-pop text-[84px]">{activeProduce.emoji}</span>
                )}
              </Panel>

              <ArrowRight size={22} className="text-carrot" />

              <Panel label="Descascado" ok>
                {activePlan.vaporize ? (
                  <div className="grid place-items-center h-full">
                    <span className="animate-pop text-[74px] opacity-90">💨</span>
                  </div>
                ) : resultUrl ? (
                  <img src={resultUrl} alt="Descascado" className="h-full w-full object-contain animate-pop" />
                ) : (
                  <span
                    className="animate-pop text-[84px]"
                    style={{ filter: "drop-shadow(0 8px 12px rgba(42,32,23,.18)) brightness(1.12) saturate(.62)" }}
                  >
                    {activeProduce.emoji}
                  </span>
                )}
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="animate-fall absolute top-5 h-[9px] w-[13px] rounded-b-[14px] opacity-0"
                    style={{ background: activeProduce.tint, left: 18 + i * 12 + "%", animationDelay: i * 0.12 + "s" }}
                  />
                ))}
                <QualityRing pct={activePlan.vaporize ? 100 : activePlan.peelPct} tint={activeProduce.tint} />
              </Panel>
            </div>

            <div className="rounded-[14px] border-2 border-ink bg-bg2 px-3.5 py-2.5 text-[14.5px] text-pretty">
              <b className="font-display">"{activePlan.nick}":</b>
            </div>

            <button onClick={reset} className="btn w-full justify-center">
              <RefreshCw size={18} /> Descascar outro
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <b className="font-display text-[26px] leading-none">{value}</b>
      <span className="mt-0.5 text-[13px] font-semibold text-muted">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-[34px] w-0.5 rounded-sm bg-line" />;
}

function Panel({ label, ok = false, children }: { label: string; ok?: boolean; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border-[2.5px] border-ink bg-white">
      <div
        className={
          "flex items-center justify-center gap-1.5 border-b-2 border-ink p-[7px] text-[12.5px] font-extrabold " +
          (ok ? "bg-lime text-[#16320a]" : "bg-bg2")
        }
      >
        {ok && <Check size={13} />}
        {label}
      </div>
      <div className="checker relative h-[300px] overflow-hidden">{children}</div>
    </div>
  );
}
