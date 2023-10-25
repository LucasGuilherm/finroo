import { UserHeader } from "@/components";
import ResumoTotal from "./components/resumoTotal";
import BtnsNew from "./components/btnsNew";
import { MeusCartoes } from "./components/meusCartoes";
import SaldoTotal from "./components/saldoTotal";
import SecaoPendentes from "./components/despesasPendentes";
import MinhasContas from "./components/minhasContas";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0;

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-col gap-6 p-4">
        <UserHeader />

        <SaldoTotal />

        <BtnsNew />

        <MinhasContas />

        <Separator />

        <SecaoPendentes />

        <ResumoTotal />

        <MeusCartoes />
      </section>
    </>
  );
};

export default Dashboard;
