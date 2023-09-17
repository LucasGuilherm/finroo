"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";

const StepConta = () => {
  const { handleNext, handleFormInput } = useContext(NewContext);

  const listaContas = [
    { id: 1, contaNome: "Dinheiro" },
    { id: 2, contaNome: "Inter débito" },
    { id: 3, contaNome: "Nubank crédito" },
    { id: 4, contaNome: "Nubank débito" },
  ];

  const handleInput = (value: number) => {
    handleFormInput({ chave: "conta", valor: value });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Qual conta deseja lançar?</h1>
      {listaContas.map((conta) => {
        return (
          <div
            key={conta.id}
            className="flex flex-row items-center gap-4"
            onClick={() => handleInput(conta.id)}
          >
            <div className="bg-slate-200 rounded-full h-12 w-12"></div>
            <span className="font-medium text-base">{conta.contaNome}</span>
          </div>
        );
      })}
    </>
  );
};

export default StepConta;
