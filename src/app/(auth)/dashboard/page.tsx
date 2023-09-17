import { UserHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "@/components/icons";
import Link from "next/link";

function Dashboard() {
  return (
    <>
      <UserHeader />

      <div className="flex flex-col">
        <span className="text-base">Saldo Geral</span>
        <span className="text-4xl">
          <span className="text-3xl">R$</span> 4.000,00
        </span>
      </div>

      <div className="flex flex-row gap-2 justify-center">
        <Button
          variant={"receita"}
          className="font-medium text-base flex-1 shadow rounded-[8px]"
        >
          <Link
            href={"/newTransaction"}
            className="flex flex-row gap-3 justify-center items-center"
          >
            <ArrowDown size={20} weight="bold" />
            Receita
          </Link>
        </Button>

        <Button
          variant={"despesa"}
          className="font-medium text-base flex-1 shadow rounded-[8px]"
        >
          <Link
            href={"/newTransaction"}
            className="flex flex-row gap-3 justify-center items-center"
          >
            <ArrowUp size={20} weight="bold" />
            Despesa
          </Link>
        </Button>
      </div>
      <Button className="bg-slate-100 text-black text-base hover:bg-slate-200 justify-start py-7 px-4">
        Minhas contas
      </Button>
    </>
  );
}

export default Dashboard;
