import { cn, mascaraMoeda } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const card = cva(
  "flex-1 shadow justify-between py-5 px-4 rounded-xl flex flex-col",
  {
    variants: {
      variant: {
        receita: "bg-white",
        despesa: "bg-white",
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
    <div className={cn(card({ variant }))}>
      <span className="font-medium text-xl">R$ {mascaraMoeda(valor)}</span>
      <h3 className="text-zinc-600 ">{message}</h3>
    </div>
  );
};

const SessaoPendentes = async () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Pendentes</h2>
      <div className="flex gap-2">
        <CardPendente tipo="Receita" valor={40} variant={"receita"} />
        <CardPendente tipo="Despesa" valor={40} variant={"despesa"} />
      </div>
    </div>
  );
};

export default SessaoPendentes;
