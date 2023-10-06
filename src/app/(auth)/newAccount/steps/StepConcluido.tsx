"use client";

import { PencilIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { FormInputs, NewContext } from "../NewContext";
import { fetchApi } from "@/lib/fetchWrap";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const postConta = async (conta: FormInputs) => {
  const data = await fetchApi("/contas/newConta", {
    method: "POST",
    body: JSON.stringify(conta),
  });

  return data;
};

const StepConcluido = () => {
  const { form } = useContext(NewContext);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: FormInputs) => postConta(data),
  });

  useEffect(() => {
    mutation.mutate(form, {
      onSuccess: () => {
        // router.replace("/accounts");
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
