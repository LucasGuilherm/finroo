"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TransactionForm } from "../page";

type StepDescricaoProps = {
  handleNext: (inputs: Partial<TransactionForm>) => void;
  tipo: string;
  corDestaque: "receita" | "despesa";
};

const StepDescricao = ({
  handleNext,
  tipo,
  corDestaque,
}: StepDescricaoProps) => {
  const inputRef = useRef<any>();

  const handleInput = () => {
    if (!inputRef.current.value) return;

    handleNext({
      descricao: inputRef.current.value,
    });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Qual descrição da {tipo}?</h1>
      <Input
        ref={inputRef}
        placeholder="Descrição"
        className="border-x-0 border-t-0 font-medium text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-6"
      />
      <div className="flex flex-row justify-end">
        <Button
          onClick={handleInput}
          className="rounded-full font-medium items-center text-lg px-5 py-6 gap-2"
          variant={corDestaque}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepDescricao;
