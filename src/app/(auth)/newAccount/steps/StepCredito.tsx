"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const StepCredito = () => {
  const { handleNext, handleFormInput } = useContext(NewContext);
  const refVencimento = useRef<HTMLInputElement>(null);
  const refFechamento = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>("");

  const handleInput = () => {
    const diaVencimento = Number(refVencimento.current?.value);
    const diaFechamento = Number(refFechamento.current?.value);

    if (!diaVencimento || !diaFechamento) return;

    setMessage("");

    if (diaVencimento < diaFechamento) {
      setMessage("Vencimento menor que fechamento!");
      return;
    }

    handleFormInput({
      chave: "vencimento",
      valor: diaVencimento,
    });
    handleFormInput({
      chave: "fechamento",
      valor: diaFechamento,
    });

    handleNext();
  };

  const numberLimit = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) return;

    const value = ref.current.value;
    const input = ref.current;

    input.value = value == "0" ? "" : String(value);

    if (Number(value) > 31) {
      input.value = value.slice(0, -1);
    }
  };

  return (
    <>
      <h1 className="font-medium text-3xl">
        Informe o dia de vencimento e fechamento do cartão
      </h1>

      <div>
        <div className="flex flex-row gap-4 items-center justify-evenly">
          <span className="text-2xl font-medium">Fechamento</span>
          <Input
            ref={refFechamento}
            onChange={() => numberLimit(refFechamento)}
            type="number"
            placeholder="5"
            className="w-14 text-center border-0 border-b-2 font-medium text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-6"
          />
        </div>
        <div className="flex flex-row gap-4 items-center justify-evenly">
          <span className="text-2xl font-medium">Vencimento</span>
          <Input
            ref={refVencimento}
            onChange={() => numberLimit(refVencimento)}
            type="number"
            placeholder="10"
            className="w-14 text-center border-0 border-b-2 font-medium text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-6"
          />
        </div>
      </div>

      <span className="text-center text-destructive text-base min-h-[1.5rem]">
        {message}
      </span>

      <div className="flex flex-row justify-end">
        <Button
          onClick={handleInput}
          className="rounded-full font-medium items-center text-lg px-5 py-6 gap-2"
          variant={"despesa"}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepCredito;
