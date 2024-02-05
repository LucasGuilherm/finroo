import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MinhasContas = () => {
  return (
    <Link
      className="flex justify-center items-center mx-auto px-4 py-2 gap-4 rounded-full border border-zinc-300"
      href={"/accounts"}
    >
      <span className="font-medium text-black text-base">Contas e cartões</span>
      <ArrowRight size={20} />
    </Link>
  );
};

export default MinhasContas;
