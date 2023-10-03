import { authOptions } from "@/lib/auth";
import {
  totalCreditoMes,
  totalDespesasMes,
  totalEconomiasMes,
  totalReceitasMes,
} from "@/lib/lancamentos";
import { mascaraMoeda } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";

type linhaResumoType = {
  titulo: string;
  valor: string;
};
const LinhaResumo = ({ titulo, valor }: linhaResumoType) => {
  return (
    <div className="flex flex-row justify-between items-center bg-zinc-100 p-3 rounded first:rounded-t-xl last:rounded-b-xl">
      <span>{titulo}</span>
      <span className="font-medium">R$ {valor}</span>
    </div>
  );
};

const ResumoTotal = async () => {
  const session = await getServerSession(authOptions);

  const [totalDespesas, totalReceitas, totalEconomias] = await Promise.all([
    totalDespesasMes(Number(session?.user.id)),
    totalReceitasMes(Number(session?.user.id)),
    totalEconomiasMes(Number(session?.user.id)),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium text-lg">Resumo do mês</span>
        <ChevronRight size={20} />
      </div>

      <div className="flex flex-col gap-1">
        <LinhaResumo titulo="Despesas" valor={mascaraMoeda(totalDespesas)} />
        <LinhaResumo titulo="Receitas" valor={mascaraMoeda(totalReceitas)} />
        <LinhaResumo titulo="Economias" valor={mascaraMoeda(totalEconomias)} />
      </div>
      {/* <LinhaResumo titulo="Economias" valor={mascaraMoeda(totalEconomias)} /> */}
    </div>
  );
};

export default ResumoTotal;
