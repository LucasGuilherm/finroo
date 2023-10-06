"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { ItemConta } from "../components/itemConta";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchWrap";
import { conta } from "../../accounts/components/accountsList";
import { Skeleton } from "@/components/ui/skeleton";

export const getContas = async () => {
  let { listaContas } = await fetchApi<{ listaContas: conta[] }>(
    "/contas/getContas"
  );

  return listaContas;
};

const StepConta = () => {
  const { handleNext, handleFormInput, form } = useContext(NewContext);
  const { tipo } = form;

  const { data, isLoading, isError, error } = useQuery<conta[]>({
    queryKey: ["contas"],
    queryFn: getContas,
  });

  if (isError) {
    console.error(error);
  }

  const handleInput = (value: number) => {
    handleFormInput({ chave: "conta", valor: value });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">{`Qual conta deseja lançar a ${tipo.toLowerCase()}?`}</h1>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <>
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full h-12 w-12" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full h-12 w-12" />
              <Skeleton className="h-4 w-28" />
            </div>
          </>
        )}

        {data?.map((conta) => {
          if (form.tipo == "Receita" && conta.tipo == "Crédito") {
            return;
          }

          return (
            <ItemConta
              key={conta.id}
              id={conta.id}
              nome={conta.conta}
              onClick={handleInput}
            />
          );
        })}
        <Link href={"/newAccount"}>
          <div className="flex flex-row items-center gap-4 mt-4">
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
