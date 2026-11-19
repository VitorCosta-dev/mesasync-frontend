import React from "react";

export const brl = (valor) =>
  Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
      <span className="h-2 w-2 rounded-full bg-[#ff5722]" />
      {children}
    </p>
  );
}

export default function PageShell({ eyebrow, title, accent, subtitle, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f8f8] font-sans text-[#1a1d29]">
      {/* círculos decorativos, como no login */}
      <div className="pointer-events-none absolute -left-44 top-52 h-[560px] w-[560px] rounded-full border-[44px] border-[#e8f0ed]" />
      <div className="pointer-events-none absolute -right-52 -top-24 h-[640px] w-[640px] rounded-full border-[44px] border-[#fdece5]" />

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <header className="mb-8 flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#1f7a8c]">Mesa</span>
            <span className="text-[#ff5722]">Sync</span>
          </span>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280] sm:block">
            Simples do início ao fim
          </span>
        </header>

        <main className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(26,29,41,0.18)] sm:p-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {title} <span className="text-[#ff5722]">{accent}</span>
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6b7280]">
              {subtitle}
            </p>
          )}
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}