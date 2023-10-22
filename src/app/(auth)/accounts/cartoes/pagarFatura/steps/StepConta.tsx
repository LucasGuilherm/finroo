"use client";

import { useQuery } from "@tanstack/react-query";
import { PgtoFaturaForm } from "../page";
import { getContasCartoes } from "@/app/(auth)/newTransaction/steps/StepConta";
import { ItemConta } from "@/app/(auth)/newTransaction/components/itemConta";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  onClick: (inputs: Partial<PgtoFaturaForm>) => void;
};

const ContaInput = ({ onClick }: props) => {
  const {
    data: dados,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contas"],
    queryFn: getContasCartoes,
  });

  if (isError) {
    console.error(error);
  }

  const handleInput = (id: number) => {
    onClick({ contaPagamentoId: id });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Pagar com saldo de qual conta?</h1>
      <div className="flex flex-col gap-4">
        {isLoading && <SkeletonListaContas />}
        {dados?.map((conta) => {
          if (!("conta" in conta)) {
            return;
          }

          return (
            <ItemConta
              key={conta.id}
              id={conta.id}
              nome={conta.conta}
              onClick={handleInput}
              tipo="despesa"
            />
          );
        })}
      </div>
    </>
  );
};

const SkeletonListaContas = () => {
  return (
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
  );
};

export default ContaInput;
