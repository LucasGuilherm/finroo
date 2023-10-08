"use client";

import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getContas } from "../../newTransaction/steps/StepConta";
import Loading from "../../loading";

export type conta = {
  id: number;
  conta: string;
  tipo: string;
  fechamento?: number;
  vencimento?: number;
  userId: number;
  saldo: string;
};

const AccountsList = () => {
  const { data: listaContas } = useQuery<conta[]>({
    queryKey: ["contas"],
    queryFn: getContas,
  });

  if (!listaContas) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {listaContas.map((conta) => {
        return (
          <Link
            key={conta.id}
            href={`./accounts/${conta.id}`}
            className="bg-white flex flex-row gap-3 p-4 rounded-lg shadow"
          >
            <CreditCard size={24} />
            <span className="font-medium">{conta.conta}</span>
            <span className="ml-auto">{conta.tipo}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsList;
