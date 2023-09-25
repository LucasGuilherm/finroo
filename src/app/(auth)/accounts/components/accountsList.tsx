import { headers } from "next/headers";
import { fetchApi } from "@/lib/fetchWrap";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export type conta = {
  id: number;
  conta: string;
  tipo: string;
  fechamento?: number;
  vencimento?: number;
  userId: number;
};

const AccountsList = async () => {
  const { listaContas } = await fetchApi<{
    listaContas: conta[];
    message?: string;
  }>("/contas/getContas", {
    headers: headers(),
  });

  // await new Promise((r) => setTimeout(r, 2000));

  return (
    <div className="flex flex-col gap-4">
      {listaContas.map((conta) => {
        console.log(conta);

        return (
          <Link
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
