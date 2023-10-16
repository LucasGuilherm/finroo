"use client";

import { ContaForm } from "../page";

type tipoConta = "Dinheiro" | "Débito" | "Crédito" | "Poupança";

const listaTipoConta: {
  id: number;
  tipo: tipoConta;
}[] = [
  { id: 1, tipo: "Dinheiro" },
  { id: 2, tipo: "Débito" },
  { id: 3, tipo: "Crédito" },
  { id: 4, tipo: "Poupança" },
];

type StepTipoProps = {
  handleNext: (inputs: Partial<ContaForm>) => void;
};

const StepTipo = ({ handleNext }: StepTipoProps) => {
  const handleInput = (tipo: tipoConta) => {
    if (!tipo) return;

    handleNext({ tipo: tipo });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Informe o tipo da conta</h1>
      <div className="flex flex-col gap-4">
        {listaTipoConta.map((conta) => {
          return (
            <div
              key={conta.id}
              className="flex flex-row items-center gap-4"
              onClick={() => handleInput(conta.tipo)}
            >
              <div className="bg-slate-200 rounded-full h-12 w-12"></div>
              <span className="font-medium text-base">{conta.tipo}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StepTipo;
