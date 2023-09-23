"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
  handleNext: () => void;
  handleBack: () => void;
  handleFormInput: ({ chave, valor }: { chave: string; valor: any }) => void;
  step: number;
  form: FormInputs;
  corDestaque: "receita" | "despesa";
}

export type FormInputs = {
  conta: string;
  valor: number;
  descricao: string;
  data: Date | null;
  categoria: string;
  tipo: "Receita" | "Despesa";
};

export const NewContext = createContext<ContextProps>({
  handleNext: () => {},
  handleBack: () => {},
  handleFormInput: () => {},
  step: 1,
  corDestaque: "despesa",
  form: {
    categoria: "",
    conta: "",
    data: null,
    descricao: "",
    valor: 0,
    tipo: "Despesa",
  },
});

export const NewFormProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const tipo = searchParams.get("tipo");

  if (!(tipo == "Receita" || tipo == "Despesa")) return;

  const corDestaque = tipo == "Receita" ? "receita" : "despesa";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormInputs>({
    categoria: "",
    conta: "",
    data: null,
    descricao: "",
    valor: 0,
    tipo: tipo,
  });

  const handleNext = () => {
    setStep((old) => old + 1);
  };
  const handleBack = () => {
    setStep((old) => old - 1);
  };

  const handleFormInput = ({ chave, valor }: { chave: string; valor: any }) => {
    const updatedValue = { [chave]: valor };

    setForm((oldForm) => ({ ...oldForm, ...updatedValue }));
  };

  return (
    <NewContext.Provider
      value={{
        handleBack,
        handleNext,
        step,
        handleFormInput,
        form,
        corDestaque,
      }}
    >
      {children}
    </NewContext.Provider>
  );
};
