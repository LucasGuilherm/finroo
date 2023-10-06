import { UserHeader } from "@/components";
import ResumoTotal from "./components/resumoTotal";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Bell } from "lucide-react";
import BtnsNew from "./components/btnsNew";
import { MinhasContas } from "./components/minhasContas";
import SaldoTotal from "./components/saldoTotal";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <UserHeader />
        <div className="flex flex-row bg-zinc-100 py-1 px-4 rounded-full justify-between gap-2">
          <span>3</span>
          <Bell />
        </div>
      </div>

      <SaldoTotal />

      <BtnsNew />

      <Link
        className="bg-zinc-100 shadow hover:bg-slate-200 justify-between items-center py-5 px-4 rounded-xl flex"
        href={"/accounts"}
      >
        <span className="font-medium text-black text-base">Minhas contas</span>
        <ArrowRight />
      </Link>

      <Separator />

      <ResumoTotal />

      <Separator />

      <MinhasContas />

      {/* <Separator /> */}
    </>
  );
};

export default Dashboard;
