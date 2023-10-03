import { ChevronRight, ShoppingCart } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { format } from "date-fns";
import { mascaraMoeda } from "@/lib/utils";

type itemProps = {
  valor: number;
  descricao: string;
  data: string;
  tipo: "Despesa" | "Receita";
};

const ItemLancamentoLista = ({ valor, descricao, tipo, data }: itemProps) => {
  const valorFormat = mascaraMoeda(Number(valor));

  return (
    <li className="flex items-center gap-4">
      <div
        className={`${
          tipo == "Despesa" ? "bg-despesa/70" : "bg-receita/70"
        } rounded-full p-3 flex items-center justify-center`}
      >
        <ShoppingCart size={24} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-medium">{descricao}</h1>
        <span className="text-xs">{data}</span>
      </div>

      <span className="ml-auto self-start font-medium text-lg">
        R$ {valorFormat}
      </span>
    </li>
  );
};

const ListaLancamentos = async ({ conta }: { conta?: number }) => {
  const session = await getServerSession(authOptions);

  const lancamentos = await prisma?.lancamentos.findMany({
    where: {
      userId: Number(session?.user.id),
      ...(conta ? { contaId: conta } : {}),
    },
    take: 10,
    orderBy: {
      data: "desc",
    },
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <span className="text-lg font-medium">Recentes</span>
        {/* <ChevronRight size={24} /> */}
      </header>
      <ul className="flex flex-col gap-5">
        {lancamentos.map((item) => {
          const tipoFormat = item.tipo == "Receita" ? "Receita" : "Despesa";

          return (
            <ItemLancamentoLista
              valor={Number(item.valor)}
              data={format(item.data, "dd MMM, HH:mm")}
              descricao={item.descricao}
              key={item.id}
              tipo={tipoFormat}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ListaLancamentos;
