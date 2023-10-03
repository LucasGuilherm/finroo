import { UserHeader } from "@/components";
import ResumoTotal from "./components/resumoTotal";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
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

      <Separator />

      <ResumoTotal />

      <Separator />

      {/* <MinhasContas /> */}

      <Link
        className="font-medium bg-zinc-100 text-black text-base hover:bg-slate-200 justify-start py-5 px-4 rounded-[8px]"
        href={"/accounts"}
      >
        Minhas contas
      </Link>

      {/* <Separator /> */}
    </>
  );
};

export default Dashboard;
