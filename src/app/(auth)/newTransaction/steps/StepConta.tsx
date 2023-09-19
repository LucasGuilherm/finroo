"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

const StepConta = () => {
  const { handleNext, handleFormInput, form } = useContext(NewContext);

  const { tipo } = form;

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
      <h1 className="font-medium text-3xl">{`Qual conta deseja lançar a ${tipo.toLowerCase()}?`}</h1>
      <div className="flex flex-col gap-4">
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
        <Link href={"/newAccount"}>
          <div
            className="flex flex-row items-center gap-4 mt-4"
            onClick={() => console.log("criar conta")}
          >
            <div className="bg-slate-200 rounded-full w-12 h-12 flex">
              <Plus className="m-auto" size={24}></Plus>
            </div>
            <span className="font-medium text-base">Nova conta</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StepConta;
