import NavHeader from "@/components/navHeader";
import { ChevronLeft, CreditCard } from "lucide-react";
import Link from "next/link";

const listaContas = [
  { id: 1, nome: "Dinheiro" },
  { id: 2, nome: "Inter Débito" },
  { id: 3, nome: "Nubank Débito" },
  { id: 4, nome: "Nubank Crédito" },
];

const Accounts = () => {
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
