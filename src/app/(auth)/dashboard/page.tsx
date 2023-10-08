import { UserHeader } from "@/components";
import ResumoTotal from "./components/resumoTotal";
import BtnsNew from "./components/btnsNew";
import { MeusCartoes } from "./components/meusCartoes";
import SaldoTotal from "./components/saldoTotal";
import SecaoPendentes from "./components/despesasPendentes";
import MinhasContas from "./components/minhasContas";

export const revalidate = 0;

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
        <SecaoPendentes />

        <MinhasContas />

        <ResumoTotal />

        <MeusCartoes />
      </section>
    </>
  );
};

export default Dashboard;
