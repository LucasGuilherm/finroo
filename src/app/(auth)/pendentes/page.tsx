import { getLancamentosPendentes } from "@/lib/lancamentos";
import ListaPendentes from "./components/lista";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
  const session = await getServerSession(authOptions);

  const { tipo } = searchParams;
  const titulo = tipo == "Despesa" ? "Pagar" : "Receber";

  let listaPendentes = await getLancamentosPendentes<itemPendente[]>({
    tipo,
    userId: Number(session?.user.id),
  });

  for (const iterator of listaPendentes) {
    iterator.valor = Number(iterator.valor);
  }

  return (
    <>
      <ListaPendentes titulo={titulo} listaPendentes={listaPendentes} />
    </>
  );
};

export default Pententes;
