import React, { useMemo, useState } from "react";
import PageShell, { brl } from "../../components/PageShell";

// Dados de exemplo. Troque pela chamada à API (comandas do dia) quando ligar o back.
// Campos vindos do banco: id, mesa_id (numero da mesa), status ("F" fechada, "C" cancelada),
// valor_total e fechado_em.
const hoje = (h, m) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const COMANDAS_EXEMPLO = [
  { id: 118, mesa: 4, status: "F", valor_total: 142.7, fechado_em: hoje(21, 52) },
  { id: 117, mesa: 9, status: "F", valor_total: 86.0, fechado_em: hoje(21, 15) },
  { id: 116, mesa: 2, status: "C", valor_total: 35.9, fechado_em: hoje(20, 48) },
  { id: 115, mesa: 6, status: "F", valor_total: 214.4, fechado_em: hoje(20, 30) },
  { id: 114, mesa: 1, status: "F", valor_total: 58.0, fechado_em: hoje(19, 55) },
  { id: 113, mesa: 7, status: "C", valor_total: 72.5, fechado_em: hoje(19, 20) },
  { id: 112, mesa: 3, status: "F", valor_total: 121.9, fechado_em: hoje(18, 42) },
];

const FILTROS = [
  { valor: "TODAS", rotulo: "Todas" },
  { valor: "F", rotulo: "Fechadas" },
  { valor: "C", rotulo: "Canceladas" },
];

const hora = (iso) =>
  new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

function StatusBadge({ status }) {
  return status === "F" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e3f1ef] px-3 py-1 text-xs font-semibold text-[#1f7a8c]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a8c]" />
      Fechada
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdecec] px-3 py-1 text-xs font-semibold text-[#c0392b]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#c0392b]" />
      Cancelada
    </span>
  );
}

function Resumo({ rotulo, valor, destaque = false }) {
  return (
    <div
      className={
        "rounded-2xl p-5 " +
        (destaque
          ? "bg-[#ff5722] text-white shadow-[0_16px_32px_-14px_rgba(255,87,34,0.75)]"
          : "border border-[#eceeee] bg-white")
      }
    >
      <p className={"text-sm font-medium " + (destaque ? "text-white/85" : "text-[#6b7280]")}>
        {rotulo}
      </p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight">{valor}</p>
    </div>
  );
}

export default function HistoricoCaixa() {
  const [comandas] = useState(COMANDAS_EXEMPLO);
  const [filtro, setFiltro] = useState("TODAS");

  // O faturamento conta só comandas fechadas: cancelada não entra na soma.
  const resumo = useMemo(() => {
    const fechadas = comandas.filter((c) => c.status === "F");
    return {
      faturado: fechadas.reduce((soma, c) => soma + Number(c.valor_total), 0),
      fechadas: fechadas.length,
      canceladas: comandas.length - fechadas.length,
    };
  }, [comandas]);

  const lista = useMemo(
    () =>
      comandas
        .filter((c) => filtro === "TODAS" || c.status === filtro)
        .sort((a, b) => new Date(b.fechado_em) - new Date(a.fechado_em)),
    [comandas, filtro]
  );

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  return (
    <PageShell
      eyebrow="Histórico de caixa"
      title="Confira o turno"
      accent="de hoje."
      subtitle={`Comandas encerradas em ${dataHoje}, com horário de fechamento e total faturado.`}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Resumo rotulo="Total faturado" valor={brl(resumo.faturado)} destaque />
        <Resumo rotulo="Comandas fechadas" valor={resumo.fechadas} />
        <Resumo rotulo="Comandas canceladas" valor={resumo.canceladas} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
        {FILTROS.map((f) => {
          const ativo = f.valor === filtro;
          return (
            <button
              key={f.valor}
              type="button"
              onClick={() => setFiltro(f.valor)}
              aria-pressed={ativo}
              className={
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff5722]/25 " +
                (ativo
                  ? "bg-[#ff5722] text-white shadow-[0_8px_20px_-8px_rgba(255,87,34,0.7)]"
                  : "border border-[#e5e7eb] bg-[#f7f8f8] text-[#4b5563] hover:border-[#ff5722]/40 hover:text-[#ff5722]")
              }
            >
              {f.rotulo}
            </button>
          );
        })}
      </div>

      {lista.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[#e5e7eb] bg-[#f7f8f8] px-6 py-14 text-center">
          <p className="text-lg font-bold">Nenhuma comanda neste filtro</p>
          <p className="mt-1 text-sm text-[#6b7280]">Escolha Todas para ver o turno completo.</p>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#eceeee]">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="bg-[#f7f8f8] text-sm text-[#6b7280]">
                <th className="px-5 py-3.5 font-semibold">Comanda</th>
                <th className="px-5 py-3.5 font-semibold">Mesa</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Fechada às</th>
                <th className="px-5 py-3.5 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceeee]">
              {lista.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[#fafbfb]">
                  <td className="px-5 py-4 font-bold">#{c.id}</td>
                  <td className="px-5 py-4 text-[#4b5563]">Mesa {String(c.mesa).padStart(2, "0")}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4 tabular-nums text-[#4b5563]">{hora(c.fechado_em)}</td>
                  <td
                    className={
                      "px-5 py-4 text-right text-lg font-extrabold tabular-nums tracking-tight " +
                      (c.status === "F" ? "" : "text-[#c4c8cc] line-through decoration-2")
                    }
                  >
                    {brl(c.valor_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
}