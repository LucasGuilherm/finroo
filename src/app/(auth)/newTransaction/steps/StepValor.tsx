"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { TransactionForm } from "../page";

type StepValorProps = {
  handleNext: (inputs: Partial<TransactionForm>) => void;
  tipo: string;
  corDestaque: "receita" | "despesa";
  cartao: number;
};

const StepValor = ({
  handleNext,
  tipo,
  corDestaque,
  cartao,
}: StepValorProps) => {
  const [input, setInput] = useState("");
  const [vezesInput, setVezesInput] = useState("1");
  const [pago, setPago] = useState(true);
  const [maisOpcoes, setMaisOpcoes] = useState(false);

  const handleSubmitInput = () => {
    let tempValue = input?.replace(/\D/g, "");
    tempValue = (Number(tempValue) / 100).toFixed(2) + "";

    if (!Number(tempValue)) return;

    handleNext({
      valor: Number(tempValue),
      pago: pago,
      vezes: Number(vezesInput),
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

  const handleInputRepetir = (value: string) => {
    let tempValue = String(value).replace(/\D./g, "");

    if (tempValue == "0" || Number(tempValue) > 48) {
      return;
    }

    setVezesInput(tempValue);
  };

  const openMaisOpcoes = () => {
    setMaisOpcoes((old) => {
      return !old;
    });
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
          onChange={(value) => handleInput(value.target.value)}
          className="bg-transparent border-0 font-medium text-4xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-2"
          placeholder="R$ 0,00"
        />
      </div>

      {maisOpcoes && (
        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-row items-center border-b-2 w-fit gap-2">
            <label className="flex-1 font-medium">
              {cartao ? "Vezes:" : "Repetir:"}
            </label>
            <Input
              type="number"
              className="w-16 text-center bg-transparent border-0 font-medium text-2xl"
              placeholder="1"
              value={vezesInput}
              onChange={(value) => handleInputRepetir(value.target.value)}
            />
            <span>meses</span>
          </div>

          {!cartao && (
            <div className="flex items-center gap-6 font-medium">
              Pago
              <Switch
                checked={pago}
                onCheckedChange={(old) => setPago(!!old)}
                className="scale-100"
              />
            </div>
          )}
        </div>
      )}

      <span
        onClick={openMaisOpcoes}
        className={`${
          maisOpcoes && "text-destructive"
        } mx-auto my-4 font-medium`}
      >
        {maisOpcoes ? "cancelar" : "mais opções"}
      </span>

      <div className="flex flex-row justify-between items-center">
        <Button
          onClick={handleSubmitInput}
          className={`rounded-full font-medium items-center ml-auto text-lg px-5 py-6 gap-2`}
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
