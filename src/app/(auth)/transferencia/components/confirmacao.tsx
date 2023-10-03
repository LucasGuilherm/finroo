"use client";

import { useRouter } from "next/navigation";
import { dadosForm } from "../page";
import { useEffect, useState } from "react";
import { PencilIcon, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchWrap";

type fetchResp = {
  lancamento: {
    erro?: string;
    success: boolean;
  };
};

const postTransferencia = async (data: dadosForm) => {
  const res = await fetchApi<fetchResp>("/transferencia", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.lancamento.erro) {
    throw new Error(res.lancamento.erro);
  }

  return res;
};

const ConfirmacaoTransferencia = ({ data }: { data: dadosForm }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  console.log(data);

  const mutation = useMutation({
    mutationFn: (data: dadosForm) => postTransferencia(data),
    onError: (e: { message: string }) => {
      setError(`Falha ao registrar transferencia \n\n ${e.message}`);
    },
    retry: 1,
  });

  useEffect(() => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7 h-full justify-center">
      <span
        className={`whitespace-pre-wrap font-medium text-3xl text-center ${
          error && "text-red-600"
        }`}
      >
        {error || `Registrando transferencia`}
      </span>
      {error ? (
        <X size={36} className="stroke-red-600" />
      ) : (
        <PencilIcon size={28} />
      )}
    </div>
  );
};

export default ConfirmacaoTransferencia;
