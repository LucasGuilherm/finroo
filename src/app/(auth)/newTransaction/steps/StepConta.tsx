"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { ItemConta } from "../components/itemConta";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchWrap";
import { cartao, conta } from "../../accounts/components/accountsList";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionForm } from "../page";

export const getContasCartoes = async () => {
  const [{ listaContas }, { listaCartoes }] = await Promise.all([
    fetchApi<{ listaContas: conta[] }>("/contas/getContas"),
    fetchApi<{ listaCartoes: cartao[] }>("/cartoes/getCartoes"),
  ]);

  const lista: (conta | cartao)[] = [...listaContas, ...listaCartoes];

  return lista;
};

type StepContaProps = {
  handleNext: (inputs: Partial<TransactionForm>) => void;
  tipo: string;
};

const StepConta = ({ handleNext, tipo }: StepContaProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contas"],
    queryFn: getContasCartoes,
  });

  if (isError) {
    console.error(error);
  }

  const handleInput = (value: number, tipo: string) => {
    if (tipo == "conta") {
      handleNext({ conta: value });
    }

    if (tipo == "cartao") {
      handleNext({ cartao: value });
    }
  };

  return (
    <>
      <h1 className="font-medium text-3xl">{`Qual conta deseja lançar a ${tipo.toLowerCase()}?`}</h1>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <>
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full h-12 w-12" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full h-12 w-12" />
              <Skeleton className="h-4 w-28" />
            </div>
          </>
        )}

        {data?.map((conta, index) => {
          if (tipo == "Receita" && "nome" in conta) {
            return;
          }

          if ("nome" in conta) {
            return (
              <ItemConta
                key={index}
                id={conta.id}
                nome={conta.nome}
                tipo={"cartao"}
                onClick={handleInput}
              />
            );
          } else {
            return (
              <ItemConta
                key={index}
                id={conta.id}
                tipo={"conta"}
                nome={conta.conta}
                onClick={handleInput}
              />
            );
          }
        })}
        <Link href={"/newAccount"}>
          <div className="flex flex-row items-center gap-4 mt-4">
            <div className="bg-slate-200 rounded-full w-12 h-12 flex">
              <Plus className="m-auto" size={24}></Plus>
            </div>
            <span className="font-medium text-base">Nova conta</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StepConta;
