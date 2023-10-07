import { UserHeader } from "@/components";
import ResumoTotal from "./components/resumoTotal";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Bell } from "lucide-react";
import BtnsNew from "./components/btnsNew";
import { MeusCartoes } from "./components/meusCartoes";
import SaldoTotal from "./components/saldoTotal";
import Link from "next/link";
import SessaoPendentes from "./components/despesasPendentes";
import MinhasContas from "./components/minhasContas";

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-col p-4 bg-zinc-0">
        <UserHeader />

        <div className="flex flex-col gap-6">
          <SaldoTotal />

          <BtnsNew />
        </div>
      </section>

      <section className="flex flex-col gap-6 p-4">
        <SessaoPendentes />

        <MinhasContas />

        <ResumoTotal />

        <MeusCartoes />
      </section>
    </>
  );
};

export default Dashboard;
