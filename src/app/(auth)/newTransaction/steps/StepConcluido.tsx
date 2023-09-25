"use client";

import { PencilIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { FormInputs, NewContext } from "../NewContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/fetchWrap";

const postLancamento = async (lancamento: FormInputs) => {
  const data = await fetchApi("/lancamentos", {
    method: "POST",
    body: JSON.stringify(lancamento),
  });

  console.log(data);

  return data;
};

const StepConcluido = () => {
  const { form } = useContext(NewContext);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => postLancamento(form),
  });

  if (mutation.isSuccess) {
    router.replace("/dashboard");
  }

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="flex flex-col items-center gap-7 h-full justify-center">
      <span className="font-medium text-3xl">
        Registrando {form.tipo.toLocaleLowerCase()}
      </span>
      <PencilIcon size={36} />
    </div>
  );
};

export default StepConcluido;
