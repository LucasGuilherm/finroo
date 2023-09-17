"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const StepDescricao = () => {
  const { handleNext, handleFormInput } = useContext(NewContext);
  const inputRef = useRef<any>();

  const handleInput = () => {
    if (!inputRef.current.value) return;

    handleFormInput({ chave: "descricao", valor: inputRef.current.value });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Qual descrição da despesa?</h1>
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
