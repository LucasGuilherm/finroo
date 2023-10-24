"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/fetchWrap";
import { mascaraMoeda } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const getSaldoTotal = async () => {
  const { saldo } = await fetchApi<{ saldo: number }>("/contas/saldoTotal", {
    method: "GET",
    next: { revalidate: 0 },
  });

  return saldo;
};

const SaldoTotal = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["saldoTotal"],
    queryFn: getSaldoTotal,
  });

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg">Saldo</span>
      <span className="text-4xl font-medium">
        {isLoading ? (
          <Skeleton className="h-10 w-36" />
        ) : (
          <>
            <span className="text-3xl">R$ </span>
            {mascaraMoeda(data)}
          </>
        )}
      </span>
    </div>
  );
};

export default SaldoTotal;
