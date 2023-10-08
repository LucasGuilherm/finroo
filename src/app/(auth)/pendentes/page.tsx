import { getLancamentosPendentes } from "@/lib/lancamentos";

import ListaPendentes from "./components/lista";

type PententesProps = {
  searchParams: { tipo: "Despesa" | "Receita" };
};

export type itemPendente = {
  id: number;
  valor: number;
  descricao: string;
  tipo: string;
  data: Date;
};

const Pententes = async ({ searchParams }: PententesProps) => {
  const { tipo } = searchParams;
  const titulo = tipo == "Despesa" ? "Pagar" : "Receber";

  const listaPendentes = await getLancamentosPendentes<itemPendente[]>({
    tipo,
  });

  return (
    <>
      <ListaPendentes titulo={titulo} listaPendentes={listaPendentes} />
    </>
  );
};

export default Pententes;
