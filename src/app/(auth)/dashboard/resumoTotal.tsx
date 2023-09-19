import { ChevronRight } from "lucide-react";

type linhaResumoType = {
  titulo: string;
  valor: string;
};
const LinhaResumo = ({ titulo, valor }: linhaResumoType) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span>{titulo}</span>
      <span className="font-medium">{valor}</span>
    </div>
  );
};

const ResumoTotal = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium text-base">Resumo do mês</span>
        <ChevronRight size={20} />
      </div>

      <div className="flex flex-col gap-3 px-2">
        <LinhaResumo titulo="Despesas" valor="R$ 500,00" />
        <LinhaResumo titulo="Recebimentos" valor="R$ 5.500,00" />
        <LinhaResumo titulo="Crédito" valor="R$ 9.500,00" />
        <LinhaResumo titulo="Economias" valor="R$ 2,00" />
      </div>
    </div>
  );
};

export default ResumoTotal;
