"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContaForm } from "../page";

type StepDescricaoProps = {
  handleNext: (inputs: Partial<ContaForm>) => void;
};

const StepDescricao = ({ handleNext }: StepDescricaoProps) => {
  const inputRef = useRef<any>();

  const handleInput = () => {
    if (!inputRef.current.value) return;

    handleNext({ nome: inputRef.current.value });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Qual nome da conta?</h1>
      <Input
        ref={inputRef}
        placeholder="Descrição"
        className="border-x-0 border-t-0 font-medium text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-6"
      />
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

export default StepDescricao;
