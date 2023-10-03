"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { dadosForm } from "../page";
import { useQuery } from "@tanstack/react-query";
import { conta } from "../../accounts/components/accountsList";

const mascara = ({ value, limit }: { value: string; limit: number }) => {
  let tempValue = value.replace(/\D/g, "");
  tempValue = (Number(tempValue) / 100).toFixed(2) + "";

  if (Number(tempValue) > limit) {
    return;
  }

  tempValue = tempValue.replace(".", ",");
  tempValue = tempValue.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  tempValue = "R$ " + tempValue.replace(/(\d)(\d{3}),/g, "$1.$2,");

  return tempValue;
};

type props = {
  onClick: (inputs: Partial<dadosForm>) => void;
  valor: number;
  saldo: Number;
};

const StepValorTransferencia = ({ onClick, valor, saldo }: props) => {
  const [input, setInput] = useState<string>();
  const [isSet, setIsSet] = useState(false);

  const handleInput = (value: string) => {
    let tempValue = value.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (Number(tempValue) > 9999999) {
      return;
    }

    if (Number(tempValue) > 0) {
      setIsSet(true);
    }

    if (Number(tempValue) == 0) {
      setIsSet(false);
    }

    tempValue = tempValue.replace(".", ",");
    tempValue = tempValue.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    tempValue = "R$ " + tempValue.replace(/(\d)(\d{3}),/g, "$1.$2,");

    setInput(tempValue);
  };

  const handleNext = () => {
    let tempValue = input;

    tempValue = tempValue?.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    onClick({ valor: Number(tempValue || 0) });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Qual valor da tranferencia?</h1>

      <span>
        Saldo disponível:{" "}
        {mascara({ value: String(saldo.toFixed(2)), limit: 99999999 })}
      </span>
      <div className="flex flex-row items-center border-b-2 gap-2">
        <Input
          type="string"
          value={input}
          defaultValue={mascara({ value: valor.toString(), limit: 99999999 })}
          inputMode="numeric"
          onChange={(value) => handleInput(value.target.value)}
          className="border-0 font-medium text-4xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-2"
          placeholder="R$ 0,00"
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button
          onClick={() => {
            if (isSet) {
              handleNext();
            }
          }}
          disabled={!isSet}
          className={`rounded-full font-medium items-center text-lg px-5 py-6 gap-2`}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepValorTransferencia;
