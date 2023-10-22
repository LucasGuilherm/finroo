"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PgtoFaturaForm } from "../page";
import { mascaraMoeda } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type StepValorProps = {
  handleNext: (inputs: Partial<PgtoFaturaForm>) => void;
  valorFatura: number;
};

const ValorPagamentoPgto = ({ handleNext, valorFatura }: StepValorProps) => {
  const [input, setInput] = useState("");

  const handleSubmitInput = () => {
    let tempValue = input?.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (!Number(tempValue)) return;

    handleNext({
      valor: Number(tempValue),
    });
  };

  const handleInput = (value: string) => {
    let tempValue = value.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (Number(tempValue) > 999999) {
      return;
    }

    tempValue = tempValue.replace(".", ",");
    tempValue = tempValue.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    tempValue = "R$ " + tempValue.replace(/(\d)(\d{3}),/g, "$1.$2,");

    setInput(tempValue);
  };

  return (
    <>
      <h1 className="font-medium text-3xl">
        Qual valor de pagamento da fatura?
      </h1>

      <div className="flex flex-row gap-3 items-center my-4">
        <span>Valor em aberto</span>
        {valorFatura ? (
          <h2 className="font-medium text-2xl">
            R$ {mascaraMoeda(valorFatura)}
          </h2>
        ) : (
          <Skeleton className="flex-1 h-8" />
        )}
      </div>

      <div className="flex flex-row items-center border-b-2 gap-2">
        <Input
          type="string"
          inputMode="numeric"
          value={input}
          onChange={(value) => handleInput(value.target.value)}
          className="bg-transparent border-0 font-medium text-4xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-2"
          placeholder="R$ 0,00"
        />
      </div>

      <div className="flex flex-row justify-between items-center">
        <Button
          onClick={handleSubmitInput}
          className={`rounded-full font-medium items-center ml-auto text-lg px-5 py-6 gap-2`}
          variant={"despesa"}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default ValorPagamentoPgto;
