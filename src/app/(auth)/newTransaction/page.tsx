"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import StepConta from "./steps/StepConta";
import StepValor from "./steps/StepValor";
import StepDescricao from "./steps/StepDescricao";
import StepCategoria from "./steps/StepCategoria";
import StepConcluido from "./steps/StepConcluido";
import StepData from "./steps/StepData";
import { useMultistep } from "@/hooks/useMultistep";
import { useEffect, useState } from "react";

export type TransactionForm = {
  categoria: number;
  conta: number;
  data: string;
  descricao: string;
  valor: number;
  pago: boolean;
  tipo: "Receita" | "Despesa" | "Transferencia" | string;
};

function NewTransaction() {
  const router = useRouter();
  const params = useSearchParams();
  let tipo = params.get("tipo");

  if ((tipo !== "Receita" && tipo !== "Despesa") || !tipo) {
    tipo = "Despesa";
  }

  const dadosIniciais: TransactionForm = {
    categoria: 0,
    conta: 0,
    data: "",
    descricao: "",
    valor: 0,
    tipo: tipo,
    pago: true,
  };

  const [data, setData] = useState(dadosIniciais);

  const handleNext = (inputs: Partial<TransactionForm>) => {
    setData((old) => {
      return {
        ...old,
        ...inputs,
      };
    });

    next();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const corDestaque = tipo == "Receita" ? "receita" : "despesa";

  const { step, next, isLast, isFirst, back } = useMultistep([
    <StepConta {...data} handleNext={handleNext} />,
    <StepValor {...data} handleNext={handleNext} corDestaque={corDestaque} />,
    <StepDescricao
      {...data}
      handleNext={handleNext}
      corDestaque={corDestaque}
    />,
    <StepData {...data} handleNext={handleNext} corDestaque={corDestaque} />,
    <StepCategoria
      {...data}
      handleNext={handleNext}
      corDestaque={corDestaque}
    />,
    <StepConcluido form={{ ...data }} />,
  ]);

  const handleIconClick = () => {
    if (isLast || isFirst) {
      router.back();
      return;
    }

    back();
  };

  return (
    <>
      <div
        onClick={handleIconClick}
        className="flex flex-row items-center gap-2 w-fit cursor-pointer"
      >
        {isLast || isFirst ? (
          <>
            <X size={28} />
            <span className="font-medium">fechar</span>
          </>
        ) : (
          <>
            <ChevronLeft size={28} />
            <span className="font-medium">voltar</span>
          </>
        )}
      </div>

      {step}
    </>
  );
}

export default NewTransaction;
