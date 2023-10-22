"use client";

import { PencilIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/fetchWrap";
import { PgtoFaturaForm } from "../page";

const postFaturaPagamento = async (fatura: PgtoFaturaForm) => {
  const data = await fetchApi("/fatura/pagarfatura", {
    method: "POST",
    body: JSON.stringify(fatura),
  });

  return data;
};

type StepConcluidoProps = {
  form: PgtoFaturaForm;
};

const StepConcluido = ({ form }: StepConcluidoProps) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data: PgtoFaturaForm) => postFaturaPagamento(data),
    onError: (e) => {
      setError(`Falha ao registrar pagamento do cartão`);
    },
    retry: 1,
  });

  useEffect(() => {
    mutation.mutate(form, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7 h-full justify-center">
      <span className="font-medium text-3xl text-center">
        {error || `Registrando pagamento`}
      </span>
      {error ? (
        <X size={36} className="stroke-red-600" />
      ) : (
        <PencilIcon size={28} />
      )}
    </div>
  );
};

export default StepConcluido;
