"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const StepSaldoInicial = () => {
  const { handleNext, handleFormInput } = useContext(NewContext);
  const [input, setInput] = useState<string>();

  const handleSubmitInput = () => {
    let tempValue = input?.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (!tempValue) {
      tempValue = String(0);
    }

    handleFormInput({ chave: "saldoInicial", valor: tempValue });

    handleNext();
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
        Qual o saldo inicial dessa conta?
      </h1>
      <div className="flex flex-row items-center border-b-2 gap-2">
        {/* <span className="text-4xl font-medium">R$</span> */}
        <Input
          type="string"
          inputMode="numeric"
          value={input}
          onChange={(value) => handleInput(value.target.value)}
          className="border-0 font-medium text-4xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-2"
          placeholder="R$ 0,00"
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button
          onClick={handleSubmitInput}
          className="rounded-full font-medium items-center text-lg px-5 py-6 gap-2"
          variant={"despesa"}
        >
          Criar conta
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepSaldoInicial;
