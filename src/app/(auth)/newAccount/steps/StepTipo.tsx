"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";

const listaTipoConta = [
  { id: 1, tipo: "Dinheiro" },
  { id: 2, tipo: "Débito" },
  { id: 3, tipo: "Crédito" },
  { id: 4, tipo: "Poupança" },
];

const StepTipo = () => {
  const { handleNext, handleFormInput } = useContext(NewContext);

  const handleInput = (tipo: string) => {
    if (!tipo) return;

    handleFormInput({ chave: "tipo", valor: tipo });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Informe o tipo da conta</h1>
      <div className="flex flex-col gap-4">
        {listaTipoConta.map((conta) => {
          return (
            <div
              key={conta.id}
              className="flex flex-row items-center gap-4"
              onClick={() => handleInput(conta.tipo)}
            >
              <div className="bg-slate-200 rounded-full h-12 w-12"></div>
              <span className="font-medium text-base">{conta.tipo}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StepTipo;
