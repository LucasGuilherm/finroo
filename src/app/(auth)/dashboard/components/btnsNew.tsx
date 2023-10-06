import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";

const BtnsNew = () => {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <Link
        href={{ pathname: "/newTransaction", query: { tipo: "Receita" } }}
        className="flex flex-row gap-2 py-4 px-3 items-center justify-center font-medium text-base flex-1 shadow rounded-full bg-receita"
      >
        <ArrowDown />
        Receita
      </Link>

      <Link
        href={{ pathname: "/newTransaction", query: { tipo: "Despesa" } }}
        className="flex flex-row gap-2 px-3 items-center py-4 justify-center font-medium text-base flex-1 shadow rounded-full bg-despesa"
      >
        <ArrowUp />
        Despesa
      </Link>
    </div>
  );
};

export default BtnsNew;
