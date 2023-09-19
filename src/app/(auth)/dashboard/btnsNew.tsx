import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";

const BtnsNew = () => {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <Link
        href={{ pathname: "/newTransaction", query: { tipo: "Receita" } }}
        className="flex flex-row gap-4 p-3 items-center justify-center font-medium text-base flex-1 shadow rounded-[8px] bg-receita"
      >
        <ArrowDown />
        Receita
      </Link>

      <Link
        href={{ pathname: "/newTransaction", query: { tipo: "Despesa" } }}
        className="flex flex-row gap-4 p-3 items-center justify-center font-medium text-base flex-1 shadow rounded-[8px] bg-despesa"
      >
        Despesa
        <ArrowUp />
      </Link>
    </div>
  );
};

export default BtnsNew;
