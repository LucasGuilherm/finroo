import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
  handleNext: () => void;
  handleBack: () => void;
  handleFormInput: ({ chave, valor }: { chave: string; valor: any }) => void;
  step: number;
  form: FormInputs;
}

export type FormInputs = {
  descricao: string;
  tipo: "Dinheiro" | "Crédito" | "Débito" | "Poupança" | "";
  saldoInicial?: number;
  vencimento?: number;
  fechamento?: number;
};

export const NewContext = createContext<ContextProps>({
  handleNext: () => {},
  handleBack: () => {},
  handleFormInput: () => {},
  step: 1,
  form: { descricao: "", tipo: "" },
});

export const NewFormProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormInputs>({
    descricao: "",
    tipo: "",
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

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  return (
    <NewContext.Provider
      value={{ handleBack, handleNext, step, handleFormInput, form }}
    >
      {children}
    </NewContext.Provider>
  );
};
