import NavHeader from "@/components/navHeader";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export type conta = {
  id: number;
  nome: string;
};

const Accounts = async () => {
  let data = await fetch("http://localhost:3000/api/contas");
  // let data = await fetch("https://finroo.vercel.app/api/contas");
  const { listaContas }: { listaContas: conta[] } = await data.json();

  // console.log("server");
  // console.log(listaContas);

  return (
    <>
      <NavHeader variant="close" />

      <h1 className="text-2xl font-medium">Minhas contas</h1>

      <div className="flex flex-col gap-4">
        {listaContas.map((conta) => {
          return (
            <Link
              href={`./accounts/${conta.id}`}
              className="bg-slate-200 flex flex-row gap-3 p-4 rounded-lg"
            >
              <CreditCard size={24} />
              <span>{conta.nome}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Accounts;
