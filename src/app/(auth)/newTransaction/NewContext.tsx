import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
  handleNext: () => void;
  handleBack: () => void;
  handleFormInput: ({ chave, valor }: { chave: string; valor: any }) => void;
  step: number;
  form: FormInputs;
}

interface props {
  children: ReactNode;
}

type FormInputs = {
  conta: string;
  valor: number;
  descricao: string;
  data: Date | null;
  categoria: string;
};

export const NewContext = createContext<ContextProps>({
  handleNext: () => {},
  handleBack: () => {},
  handleFormInput: () => {},
  step: 1,
  form: { categoria: "", conta: "", data: null, descricao: "", valor: 0 },
});

export const NewFormProvider = ({ children }: props) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormInputs>({
    categoria: "",
    conta: "",
    data: null,
    descricao: "",
    valor: 0,
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
