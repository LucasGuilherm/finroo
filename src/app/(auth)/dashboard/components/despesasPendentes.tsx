"use client";

import { totalPendente } from "@/lib/dbActions/lancamentos";
import { fetchApi } from "@/lib/fetchWrap";
import { cn, mascaraMoeda } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading";
import { Skeleton } from "@/components/ui/skeleton";

type totalPendente = {
  receita: number;
  despesa: number;
};

const getPendentes = async () => {
  const pendentes = await fetchApi<totalPendente>("/lancamentos/pendentes", {
    method: "GET",
    // next: { revalidate: 10 },
  });

  return pendentes;
};

const SecaoPendentes = async () => {
  const { data } = useQuery({
    queryKey: ["pendentes"],
    queryFn: getPendentes,
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Pendentes</h2>
      <div className="flex gap-2">
        {!!data && (
          <>
            <CardPendente
              tipo={"Receita"}
              valor={Math.abs(data.receita)}
              variant={"Receita"}
            />
            <CardPendente
              tipo={"Despesa"}
              valor={Math.abs(Number(data.despesa))}
              variant={"Despesa"}
            />
          </>
        )}
      </div>
    </div>
  );
};

const card = cva(
  "flex-1 shadow justify-between py-5 px-4 rounded-xl flex flex-col bg-white",
  {
    variants: {
      variant: {
        Receita: "text-receita",
        Despesa: "text-despesa",
      },
    },
  }
);

type CardPendente = VariantProps<typeof card> & {
  valor: number;
  tipo: "Despesa" | "Receita";
};

const CardPendente = ({ valor, tipo, variant }: CardPendente) => {
  const message = tipo == "Despesa" ? "A pagar" : "A receber";

  return (
    <Link
      href={{ pathname: `/pendentes`, query: { tipo } }}
      className={cn(card({ variant }))}
    >
      <span className="font-medium text-2xl">R$ {mascaraMoeda(valor)}</span>
      <h3 className="text-zinc-700 font-medium">{message}</h3>
    </Link>
  );
};

export default SecaoPendentes;
