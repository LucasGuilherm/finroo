"use client";

import { useEffect, useState } from "react";
import StepValorTransferencia from "./components/valorInput";
import { useMultistep } from "./useMultistep";
import ContaInput from "./components/contaInput";
import ConfirmacaoTransferencia from "./components/confirmacao";
import { useSearchParams } from "next/navigation";

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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      console.log(isLast);

      setConcluido(true);

      return;
    }

    next();
  };

  return <>{!concluido ? step : <ConfirmacaoTransferencia data={data} />}</>;
};

export default NovaTransferencia;