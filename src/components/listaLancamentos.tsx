import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { format } from "date-fns";
import ItemLancamentoLista from "./itemListaLancamento";

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
      </header>
      <ul className="flex flex-col gap-5">
        {lancamentos.map((item) => {
          const tipoFormat = item.tipo == "Receita" ? "Receita" : "Despesa";

          return (
            <ItemLancamentoLista
              id={item.id}
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
