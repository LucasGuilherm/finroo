"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const StepValor = () => {
  const { handleNext, handleFormInput, corDestaque, form } =
    useContext(NewContext);
  const [input, setInput] = useState<string>();

  const { tipo } = form;

  const handleSubmitInput = () => {
    let tempValue = input?.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (!Number(tempValue)) return;

    handleFormInput({ chave: "valor", valor: tempValue });

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
        Qual valor da {tipo.toLowerCase()}?
      </h1>
      <span>Saldo disponível: R$ 4.000,00</span>
      <div className="flex flex-row items-center border-b-2 gap-2">
        <Input
          type="string"
          inputMode="numeric"
          value={input}
          defaultValue={""}
          onChange={(value) => handleInput(value.target.value)}
          className="border-0 font-medium text-4xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-2"
          placeholder="R$ 0,00"
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button
          onClick={handleSubmitInput}
          className={`rounded-full font-medium items-center text-lg px-5 py-6 gap-2`}
          variant={corDestaque}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepValor;
