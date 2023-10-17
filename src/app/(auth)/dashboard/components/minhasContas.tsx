import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MinhasContas = () => {
  return (
    <Link
      className="bg-white shadow hover:bg-zinc-200 transition-colors justify-between items-center p-4 rounded-xl flex"
      href={"/accounts"}
    >
      <span className="font-medium text-black text-base">
        Minhas contas e cartões
      </span>
      <ArrowRight />
    </Link>
  );
};

export default MinhasContas;
