import { authOptions } from "@/lib/auth";
import { totalPendente } from "@/lib/lancamentos";
import { cn, mascaraMoeda } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const card = cva(
  "flex-1 shadow justify-between py-5 px-4 rounded-xl flex flex-col",
  {
    variants: {
      variant: {
        Receita: "bg-white text-receita",
        Despesa: "bg-white text-despesa",
      },
    },
  }
);

type CardPendente = VariantProps<typeof card> & {
  valor: number;
  tipo: "Despesa" | "Receita";
};

const CardPendente = ({ valor, tipo, variant }: CardPendente) => {
  const message = tipo == "Despesa" ? "para pagar" : "para receber";

  return (
    <Link
      href={{ pathname: `/pendentes`, query: { tipo } }}
      className={cn(card({ variant }))}
    >
      <span className="font-medium text-xl">R$ {mascaraMoeda(valor)}</span>
      <h3 className="text-zinc-600 ">{message}</h3>
    </Link>
  );
};

const SecaoPendentes = async () => {
  const session = await getServerSession(authOptions);

  const pendente = await totalPendente({ userId: Number(session?.user.id) });

  if (!pendente.length) {
    return (
      <h2 className="font-medium text-xl text-zinc-500">Nenhuma pendencia</h2>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Pendentes</h2>
      <div className="flex gap-2">
        {pendente.map((item, index) => {
          if (!(item.tipo == "Receita" || item.tipo == "Despesa")) {
            return;
          }

          return (
            <CardPendente
              key={index}
              tipo={item.tipo}
              valor={Math.abs(Number(item._sum.valor))}
              variant={item.tipo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SecaoPendentes;
