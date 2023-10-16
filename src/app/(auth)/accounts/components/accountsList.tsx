"use client";

import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getContasCartoes } from "../../newTransaction/steps/StepConta";
import Loading from "../../loading";

export type conta = {
  id: number;
  conta: string;
  tipo: string;
  userId: number;
  saldo: string;
};

export type cartao = {
  id: number;
  nome: string;
  fechamento: number;
  vencimento: number;
  userId: number;
};

const AccountsList = () => {
  const { data } = useQuery({
    queryKey: ["contas"],
    queryFn: getContasCartoes,
  });

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((contaCartao, index) => {
        if ("conta" in contaCartao) {
          return (
            <Link
              key={contaCartao.id + index}
              href={{
                pathname: `./accounts/contas/${contaCartao.id}`,
                query: { tipo: "conta" },
              }}
              className="bg-white flex flex-row gap-3 p-4 px-6 rounded-full shadow"
            >
              <CreditCard size={24} />
              <span className="font-medium">{contaCartao.conta}</span>
              <span className="ml-auto">{contaCartao.tipo}</span>
            </Link>
          );
        }

        if ("nome" in contaCartao) {
          return (
            <Link
              key={contaCartao.id + index}
              href={{
                pathname: `./accounts/cartoes/${contaCartao.id}`,
                query: { tipo: "cartao" },
              }}
              className="bg-white flex flex-row gap-3 p-4 px-6 rounded-full shadow"
            >
              <CreditCard size={24} />
              <span className="font-medium">{contaCartao.nome}</span>
              <span className="ml-auto">Crédito</span>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default AccountsList;
