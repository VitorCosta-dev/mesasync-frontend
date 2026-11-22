import React, { useMemo, useState } from "react";
import PageShell, { SearchIcon, brl } from "../../components/PageShell";

// Dados de exemplo. Troque pela chamada à API (GET /produtos) quando ligar o back.
// Campos vindos do banco: nome, preco, categoria, ativo.
// "ingredientes" ainda não existe na tabela produto: combinar com quem cuida do banco.
const PRODUTOS = [
  { id: 1, nome: "Hambúrguer Clássico", preco: 35.9, categoria: "Prato principal", descricao: "Pão brioche, blend bovino 160 g, queijo prato, alface, tomate, maionese da casa", disponivel: true },
  { id: 2, nome: "Risoto de Cogumelos", preco: 48.0, categoria: "Prato principal", descricao: "Arroz arbóreo, cogumelos frescos, parmesão, vinho branco, manteiga", disponivel: true },
  { id: 3, nome: "Salmão Grelhado", preco: 62.5, categoria: "Prato principal", descricao: "Salmão, legumes assados, purê de batata-doce, molho de limão siciliano", disponivel: false },
  { id: 4, nome: "Batata Rústica", preco: 22.0, categoria: "Entrada", descricao: "Batata com casca, alecrim, alho, sal grosso", disponivel: true },
  { id: 5, nome: "Bruschetta Caprese", preco: 26.0, categoria: "Entrada", descricao: "Pão italiano, tomate, muçarela de búfala, manjericão, azeite", disponivel: true },
  { id: 6, nome: "Suco de Laranja", preco: 12.0, categoria: "Bebida", descricao: "Laranja espremida na hora", disponivel: true },
  { id: 7, nome: "Limonada Suíça", preco: 14.0, categoria: "Bebida", descricao: "Limão, leite condensado, gelo", disponivel: false },
  { id: 8, nome: "Petit Gâteau", preco: 24.0, categoria: "Sobremesa", descricao: "Chocolate meio amargo, manteiga, ovos, sorvete de creme", disponivel: true },
];

function StatusBadge({ disponivel }) {
  return disponivel ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e3f1ef] px-3 py-1 text-xs font-semibold text-[#1f7a8c]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a8c]" />
      Disponível
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fde8e0] px-3 py-1 text-xs font-semibold text-[#e64a19]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#e64a19]" />
      Esgotado
    </span>
  );
}

export default function EmentaDigital() {
  const [produtos] = useState(PRODUTOS);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const categorias = useMemo(
    () => ["Todas", ...new Set(produtos.map((p) => p.categoria))],
    [produtos]
  );

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      const daCategoria = categoria === "Todas" || p.categoria === categoria;
      const bateBusca =
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo);
      return daCategoria && bateBusca;
    });
  }, [produtos, busca, categoria]);

  return (
    <PageShell
      eyebrow="Ementa digital"
      title="Consulte o cardápio"
      accent="em segundos."
      subtitle="Veja ingredientes, preço e se o prato está disponível, sem abrir um pedido."
    >
      {/* busca */}
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por prato ou ingrediente"
          aria-label="Buscar na ementa"
          className="h-14 w-full rounded-2xl border border-[#e5e7eb] bg-[#f7f8f8] pl-14 pr-5 text-base text-[#1a1d29] placeholder:text-[#9ca3af] focus:border-[#ff5722] focus:outline-none focus:ring-4 focus:ring-[#ff5722]/15"
        />
      </div>

      {/* categorias */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Categorias">
        {categorias.map((c) => {
          const ativa = c === categoria;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              aria-pressed={ativa}
              className={
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff5722]/25 " +
                (ativa
                  ? "bg-[#ff5722] text-white shadow-[0_8px_20px_-8px_rgba(255,87,34,0.7)]"
                  : "border border-[#e5e7eb] bg-[#f7f8f8] text-[#4b5563] hover:border-[#ff5722]/40 hover:text-[#ff5722]")
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-[#6b7280]" aria-live="polite">
        {filtrados.length} {filtrados.length === 1 ? "item" : "itens"}
      </p>

      {/* lista */}
      {filtrados.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[#e5e7eb] bg-[#f7f8f8] px-6 py-14 text-center">
          <p className="text-lg font-bold">Nada encontrado</p>
          <p className="mt-1 text-sm text-[#6b7280]">
            Tente outro nome ou volte para a categoria Todas.
          </p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <li
              key={p.id}
              className={
                "flex flex-col rounded-2xl border border-[#eceeee] bg-white p-5 transition-shadow hover:shadow-[0_16px_36px_-20px_rgba(26,29,41,0.25)] " +
                (p.disponivel ? "" : "bg-[#fafafa]")
              }
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-[#1f7a8c]">{p.categoria}</span>
                <StatusBadge disponivel={p.disponivel} />
              </div>
              <h2
                className={
                  "mt-3 text-xl font-bold leading-snug tracking-tight " +
                  (p.disponivel ? "" : "text-[#9ca3af]")
                }
              >
                {p.nome}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b7280]">
                {p.descricao}
              </p>
              <p
                className={
                  "mt-5 text-2xl font-extrabold tracking-tight " +
                  (p.disponivel ? "text-[#ff5722]" : "text-[#c4c8cc] line-through decoration-2")
                }
              >
                {brl(p.preco)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}