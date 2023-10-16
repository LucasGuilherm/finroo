"use client";

import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMultistep } from "@/hooks/useMultistep";
import StepDescricao from "./steps/StepDescricao";
import StepTipo from "./steps/StepTipo";
import StepCredito from "./steps/StepCredito";
import StepSaldoInicial from "./steps/StepSaldoInicial";
import StepConcluido from "./steps/StepConcluido";
import { useEffect, useState } from "react";

export type ContaForm = {
  nome: string;
  tipo: "Dinheiro" | "Crédito" | "Débito" | "Poupança" | "";
  saldoInicial?: number;
  vencimento: number;
  fechamento: number;
};

const dadosIniciais: ContaForm = {
  nome: "",
  tipo: "",
  saldoInicial: 0,
  vencimento: 1,
  fechamento: 1,
};

function NewAccount() {
  const router = useRouter();
  const [data, setData] = useState(dadosIniciais);

  const handleNext = (inputs: Partial<ContaForm>) => {
    setData((old) => {
      return {
        ...old,
        ...inputs,
      };
    });

    next();
  };

  let listaStep = [
    <StepDescricao {...data} handleNext={handleNext} />,
    <StepTipo {...data} handleNext={handleNext} />,
    <StepSaldoInicial {...data} handleNext={handleNext} />,
    <StepConcluido form={{ ...data }} />,
  ];

  if (data.tipo == "Crédito") {
    listaStep = [
      <StepDescricao {...data} handleNext={handleNext} />,
      <StepTipo {...data} handleNext={handleNext} />,
      <StepCredito {...data} handleNext={handleNext} />,
      <StepConcluido form={{ ...data }} />,
    ];
  }

  const { isFirst, isLast, back, step, next } = useMultistep(listaStep);

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
        className="flex flex-row items-center gap-2 w-fit"
      >
        {isFirst || isLast ? (
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

export default NewAccount;
