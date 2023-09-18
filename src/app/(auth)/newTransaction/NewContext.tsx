"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
  handleNext: () => void;
  handleBack: () => void;
  handleFormInput: ({ chave, valor }: { chave: string; valor: any }) => void;
  step: number;
  form: FormInputs;
}

type FormInputs = {
  conta: string;
  valor: number;
  descricao: string;
  data: Date | null;
  categoria: string;
  tipo: string | null;
};

export const NewContext = createContext<ContextProps>({
  handleNext: () => {},
  handleBack: () => {},
  handleFormInput: () => {},
  step: 1,
  form: {
    categoria: "",
    conta: "",
    data: null,
    descricao: "",
    valor: 0,
    tipo: "",
  },
});

export const NewFormProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const tipo = searchParams.get("tipo");

  // Get the query parameter from the URL

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

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <NewContext.Provider
      value={{ handleBack, handleNext, step, handleFormInput, form }}
    >
      {children}
    </NewContext.Provider>
  );
};
