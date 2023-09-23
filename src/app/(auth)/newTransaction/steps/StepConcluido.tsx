"use client";

import { PencilIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { FormInputs, NewContext } from "../NewContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const postLancamento = async (lancamento: FormInputs) => {
  // await new Promise((r) => setTimeout(r, 4000));

  const data = await fetch("http://localhost:3000/api/lancamentos", {
    method: "POST",
    body: JSON.stringify(lancamento),
  });

  return await data.json();
};

const StepConcluido = () => {
  const { form } = useContext(NewContext);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => postLancamento(form),
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  if (mutation.isSuccess) {
    console.log(mutation.data);

    router.replace("/dashboard");
  }

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
