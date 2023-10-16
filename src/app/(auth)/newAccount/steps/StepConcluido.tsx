"use client";

import { PencilIcon } from "lucide-react";
import { useEffect } from "react";
import { fetchApi } from "@/lib/fetchWrap";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ContaForm } from "../page";

const postConta = async (contaCartao: ContaForm) => {
  if (contaCartao.tipo == "Crédito") {
    const data = await fetchApi("/cartoes/newCartao", {
      method: "POST",
      body: JSON.stringify(contaCartao),
    });

    return data;
  }

  const data = await fetchApi("/contas/newConta", {
    method: "POST",
    body: JSON.stringify(contaCartao),
  });

  return data;
};

const StepConcluido = ({ form }: { form: ContaForm }) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: ContaForm) => postConta(data),
  });

  useEffect(() => {
    mutation.mutate(form, {
      onSuccess: () => {
        router.back();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7 h-full justify-center">
      <span className="font-medium text-3xl">Criando nova conta</span>
      <PencilIcon size={36} />
    </div>
  );
};

export default StepConcluido;
