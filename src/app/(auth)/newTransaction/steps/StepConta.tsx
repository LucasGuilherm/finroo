"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { ItemConta } from "../components/itemConta";
import { conta } from "../../accounts/page";
import { useQuery } from "@tanstack/react-query";

const getContas = async () => {
  let data = await fetch("http://localhost:3000/api/contas");
  const { listaContas } = await data.json();

  return listaContas;
};

const StepConta = () => {
  const { handleNext, handleFormInput, form } = useContext(NewContext);
  const { tipo } = form;

  const { data, isLoading } = useQuery<conta[]>({
    queryKey: ["contas"],
    queryFn: getContas,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleInput = (value: number) => {
    handleFormInput({ chave: "conta", valor: value });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">{`Qual conta deseja lançar a ${tipo.toLowerCase()}?`}</h1>
      <div className="flex flex-col gap-4">
        {data?.map((conta) => {
          return (
            <ItemConta
              key={conta.id}
              id={conta.id}
              nome={conta.nome}
              onClick={handleInput}
            />
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
