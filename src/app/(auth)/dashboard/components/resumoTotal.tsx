import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import {
  totalCreditoMes,
  totalDespesasMes,
  totalEconomiasMes,
  totalReceitasMes,
} from "@/lib/dbActions/lancamentos";
import { mascaraMoeda } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";

type linhaResumoType = {
  titulo: string;
  valor: string;
  corDestaque?: "despesa" | "receita";
};
const LinhaResumo = ({ titulo, valor, corDestaque }: linhaResumoType) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="font-medium">{titulo}</span>
      <span className={`font-medium text-${corDestaque}`}>R$ {valor}</span>
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
        <span className="font-medium text-xl">Resumo do mês</span>
        <ChevronRight size={20} />
      </div>

      <div className="flex flex-col justify-center bg-white p-3 rounded-xl shadow">
        <LinhaResumo
          corDestaque={"despesa"}
          titulo="Despesas"
          valor={mascaraMoeda(totalDespesas)}
        />
        <Separator className="my-4" />
        <LinhaResumo
          corDestaque={"receita"}
          titulo="Receitas"
          valor={mascaraMoeda(totalReceitas)}
        />
        {/* <Separator className="my-4" />
        <LinhaResumo titulo="Economias" valor={mascaraMoeda(totalEconomias)} /> */}
      </div>
    </div>
  );
};

export default ResumoTotal;
