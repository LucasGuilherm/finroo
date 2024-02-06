"use client";

import { useMultistep } from "@/hooks/useMultistep";
import ValorPagamentoPgto from "./steps/valorFaturaPgto";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchWrap";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import StepData from "./steps/StepData";
import StepConcluido from "./steps/StepConcluido";
import ContaInput from "./steps/StepConta";

export type PgtoFaturaForm = {
  contaPagamentoId: number;
  dataPagamento: Date;
  valor: number;
  faturaId: number;
};

const PagarFatura = () => {
  const params = useSearchParams();
  const faturaIdParam = params.get("faturaId");
  const [faturaInfo, setFaturaInfo] = useState<fatura>();

  const faturaId = Number(faturaIdParam);

  if (!faturaId) {
    return;
  }

  const mutation = useMutation({
    mutationFn: (id: number) => getFaturaDetalhes(id),
  });

  useEffect(() => {
    mutation.mutate(faturaId, {
      onSuccess: (data: fatura) => {
        setFaturaInfo(data);
      },
    });
  }, []);

  const dadosIniciais: PgtoFaturaForm = {
    contaPagamentoId: 0,
    faturaId: faturaId,
    dataPagamento: new Date(),
    valor: 0,
  };

  const [data, setData] = useState(dadosIniciais);

  const handleNext = (inputs: Partial<PgtoFaturaForm>) => {
    setData((old) => {
      return {
        ...old,
        ...inputs,
      };
    });

    next();
  };

  const { step, next, back } = useMultistep([
    <ContaInput onClick={handleNext} />,
    <ValorPagamentoPgto
      valorFatura={
        Number(faturaInfo?.valorTotal) - Number(faturaInfo?.valorPago)
      }
      handleNext={handleNext}
    />,
    <StepData handleNext={handleNext} />,
    <StepConcluido form={{ ...data }} />,
  ]);

  return <>{step}</>;
};

type fatura = {
  id: number;
  valorTotal: Prisma.Decimal;
  valorPago: Prisma.Decimal;
  dataVencimento: Date;
  dataFechamento: Date;
  cartaoId: number;
  userId: number;
};

const getFaturaDetalhes = async (id: number) => {
  const fatura = await fetchApi<fatura>(`/fatura?faturaId=${id}`);

  return { ...fatura };
};

export default PagarFatura;
