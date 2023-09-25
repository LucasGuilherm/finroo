"use client";

import { headers } from "next/headers";
import { fetchApi } from "@/lib/fetchWrap";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContas } from "../../newTransaction/steps/StepConta";

export type conta = {
  id: number;
  conta: string;
  tipo: string;
  fechamento?: number;
  vencimento?: number;
  userId: number;
};

const AccountsList = () => {
  const { data: listaContas } = useQuery<conta[]>({
    queryKey: ["contas"],
    queryFn: getContas,
  });

  return (
    <div className="flex flex-col gap-4">
      {listaContas?.map((conta) => {
        return (
          <Link
            key={conta.id}
            href={`./accounts/${conta.id}`}
            className="bg-slate-200 flex flex-row gap-3 p-4 rounded-lg"
          >
            <CreditCard size={24} />
            <span>{conta.conta}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsList;
