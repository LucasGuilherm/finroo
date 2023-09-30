"use client";

import { PencilIcon, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FormInputs, NewContext } from "../NewContext";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/fetchWrap";

const postLancamento = async (lancamento: FormInputs) => {
  const data = await fetchApi("/lancamentos", {
    method: "POST",
    body: JSON.stringify(lancamento),
  });

  return data;
};

const StepConcluido = () => {
  const { form } = useContext(NewContext);
  const router = useRouter();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data: FormInputs) => postLancamento(data),
    onError: (e) => {
      setError(`Falha ao registrar ${form.tipo.toLowerCase()}`);
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
      <span className="font-medium text-3xl text-center text-red-600">
        {error || `Registrando ${form.tipo.toLowerCase()}`}
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
