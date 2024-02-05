"use client";

import { useQuery } from "@tanstack/react-query";
import { getContasCartoes } from "../../newTransaction/steps/StepConta";
import { ItemConta } from "../../newTransaction/components/itemConta";
import { dadosForm } from "../page";

type props = {
  onClick: (inputs: Partial<dadosForm>) => void;
  contaSaida: number;
};

const ContaInput = ({ onClick, contaSaida }: props) => {
  const {
    data: dados,
    isError,
    error,
  } = useQuery({
    queryKey: ["contas"],
    queryFn: getContasCartoes,
  });

  if (isError) {
    console.error(error);
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
          if ("nome" in conta) {
            return;
          }

          if (conta.id == contaSaida) {
            return;
          }

          return (
            <ItemConta
              key={conta.id}
              id={conta.id}
              nome={conta.conta}
              onClick={handleInput}
              tipo="despesa"
            />
          );
        })}
      </div>
    </>
  );
};

export default ContaInput;
