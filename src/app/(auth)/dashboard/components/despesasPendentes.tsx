import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DespesasPendentes = async () => {
  return (
    <>
      <Link
        className="bg-zinc-100 shadow hover:bg-slate-200 justify-between py-5 px-4 rounded-xl flex flex-col"
        href={"/accounts"}
      >
        <span className="font-medium text-lg">Pendentes</span>
        <span>R$ 60,00</span>
      </Link>
    </>
  );
};

export default DespesasPendentes;
