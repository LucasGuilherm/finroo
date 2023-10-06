"use client";

import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchWrap";
import { conta } from "../../accounts/components/accountsList";
import { getContas } from "../../newTransaction/steps/StepConta";
import { ItemConta } from "../../newTransaction/components/itemConta";
import { dadosForm } from "../page";

type props = {
  onClick: (inputs: Partial<dadosForm>) => void;
  contaSaida: number;
};

const ContaInput = ({ onClick, contaSaida }: props) => {
  const {
    data: dados,
    isLoading,
    isError,
    error,
  } = useQuery<conta[]>({
    queryKey: ["contas"],
    queryFn: getContas,
  });

  if (isError) {
    console.log(error);
  }

  const handleInput = (id: number) => {
    onClick({ conta: id });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">
        Para qual conta deseja transferir?
      </h1>
      <div className="flex flex-col gap-4">
        {dados?.map((conta) => {
          if (conta.tipo == "Crédito" || conta.id == contaSaida) {
            return false;
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
      </div>
    </>
  );
};

export default ContaInput;
