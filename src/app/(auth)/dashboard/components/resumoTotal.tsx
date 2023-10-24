"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/fetchWrap";
import { mascaraMoeda } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type totalResp = {
  totalDespesas: number;
  totalReceitas: number;
};

const getResumoTotal = async () => {
  const { totalDespesas, totalReceitas } = await fetchApi<totalResp>(
    "/lancamentos/totalMes",
    {
      method: "GET",
      next: { revalidate: 0 },
    }
  );

  return { totalDespesas, totalReceitas };
};

const ResumoTotal = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["resumoTotal"],
    queryFn: getResumoTotal,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium text-xl">Resumo do mês</span>
        {/* <ChevronRight size={20} /> */}
      </div>

      <div className="flex flex-col bg-white p-3 gap-3 rounded-xl shadow">
        <LinhaResumo
          corDestaque={"despesa"}
          titulo="Despesas"
          valor={mascaraMoeda(data?.totalDespesas)}
          isLoading={isLoading}
        />
        <Separator />
        <LinhaResumo
          corDestaque={"receita"}
          titulo="Receitas"
          valor={mascaraMoeda(data?.totalReceitas)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

type linhaResumoType = {
  titulo: string;
  valor: string;
  corDestaque?: "despesa" | "receita";
  isLoading?: boolean;
};
const LinhaResumo = ({
  titulo,
  valor,
  corDestaque,
  isLoading,
}: linhaResumoType) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="font-medium">{titulo}</span>
      {!isLoading && (
        <span className={`font-medium text-${corDestaque}`}>R$ {valor}</span>
      )}
      {isLoading && <Skeleton className="w-16 h-6" />}
    </div>
  );
};

export default ResumoTotal;
