"use client";

import { mascaraMoeda } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type itemProps = {
  valor: number;
  descricao: string;
  data: string;
  tipo: "Despesa" | "Receita";
  id: number;
};

const ItemLancamentoLista = ({
  valor,
  descricao,
  tipo,
  data,
  id,
}: itemProps) => {
  const router = useRouter();

  const valorFormat = mascaraMoeda(Number(valor));

  return (
    <li
      onClick={() => router.push(`/lancamentos/${id}`)}
      className="flex items-center gap-4"
    >
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

      <span className="ml-auto self-start font-medium text-lg whitespace-nowrap">
        R$ {valorFormat}
      </span>
    </li>
  );
};

export default ItemLancamentoLista;
