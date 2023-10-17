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
      <span className="font-medium text-2xl">R$ {mascaraMoeda(valor)}</span>
      <h3 className="text-zinc-600 font-medium">{message}</h3>
    </Link>
  );
};

const SecaoPendentes = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const receita = await totalPendente({ userId, tipo: "Receita" });
  const despesa = await totalPendente({ userId, tipo: "Despesa" });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Pendentes</h2>
      <div className="flex gap-2">
        <CardPendente
          tipo={"Receita"}
          valor={Math.abs(Number(receita._sum.valor)) || 0}
          variant={"Receita"}
        />
        <CardPendente
          tipo={"Despesa"}
          valor={Math.abs(Number(despesa._sum.valor)) || 0}
          variant={"Despesa"}
        />
      </div>
    </div>
  );
};

export default SecaoPendentes;
