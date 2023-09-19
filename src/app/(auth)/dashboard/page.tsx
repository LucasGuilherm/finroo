import { UserHeader } from "@/components";
import { ArrowUp, ArrowDown } from "@/components/icons";
import Link from "next/link";
import ResumoTotal from "./resumoTotal";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import BtnsNew from "./btnsNew";

function Dashboard() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <UserHeader />
        <div className="flex flex-row bg-accent py-1 px-4 rounded-full justify-between gap-2">
          <span>3</span>
          <Bell />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-lg">Saldo</span>
        <span className="text-4xl font-medium">
          <span className="text-3xl">R$ </span>
          4.000,00
        </span>
      </div>

      <BtnsNew />

      <Separator />

      <Link
        className="font-medium bg-slate-100 text-black text-base hover:bg-slate-200 justify-start py-5 px-4 rounded-[8px]"
        href={"/accounts"}
      >
        Minhas contas
      </Link>

      <ResumoTotal />

      <Separator />
    </>
  );
}

export default Dashboard;
