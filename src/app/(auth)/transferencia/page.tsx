"use client";

import { useEffect, useState } from "react";
import StepValorTransferencia from "./components/valorInput";
import ContaInput from "./components/contaInput";
import ConfirmacaoTransferencia from "./components/confirmacao";
import { useSearchParams } from "next/navigation";
import { useMultistep } from "@/hooks/useMultistep";

export type dadosForm = {
  valor: number;
  conta: number;
  contaSaida: number;
};

const NovaTransferencia = () => {
  const param = useSearchParams();
  const saldo = param.get("saldo");

  const dadosIniciais: dadosForm = {
    valor: 0,
    conta: 0,
    contaSaida: Number(param.get("contaSaida")),
  };

  const [data, setData] = useState(dadosIniciais);
  const [concluido, setConcluido] = useState(false);

  const handleNext = (inputs: Partial<dadosForm>) => {
    setData((old) => {
      return {
        ...old,
        ...inputs,
      };
    });

    handleNextClick();
  };

  const { steps, step, next, isLast } = useMultistep([
    <StepValorTransferencia
      {...data}
      onClick={handleNext}
      saldo={Number(saldo)}
    />,
    <ContaInput {...data} onClick={handleNext} />,
  ]);

  const handleNextClick = () => {
    if (isLast) {
      setConcluido(true);
      return;
    }

    next();
  };

  return <>{!concluido ? step : <ConfirmacaoTransferencia data={data} />}</>;
};

export default NovaTransferencia;
