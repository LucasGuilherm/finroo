"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const StepCategoria = () => {
  const { handleNext, handleFormInput, form, corDestaque } =
    useContext(NewContext);
  const [selected, setSelected] = useState<Number>();

  const { tipo } = form;

  const categorias = [
    { id: 1, categoriaNome: "Mercado" },
    { id: 2, categoriaNome: "Casa" },
    { id: 3, categoriaNome: "Lazer" },
    { id: 4, categoriaNome: "Outros" },
    { id: 5, categoriaNome: "Serviços" },
    { id: 6, categoriaNome: "restaurante" },
    { id: 7, categoriaNome: "Viagem" },
  ];

  const handleSelected = (id: number) => {
    setSelected(id);
  };

  const handleInput = () => {
    if (!selected) return;

    handleFormInput({ chave: "categoria", valor: selected });
    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">
        Informe a categoria da {tipo.toLowerCase()}
      </h1>

      <div className="flex flex-col gap-4">
        {categorias.map((categoria) => {
          return (
            <div
              key={categoria.id}
              onClick={() => handleSelected(categoria.id)}
              className="flex flex-row gap-4 items-center px-2"
            >
              <div
                className={cn(
                  `w-12 h-12 rounded-full bg-slate-200 ${
                    selected == categoria.id && `bg-${corDestaque}`
                  }`
                )}
              ></div>
              <span
                className={`text-base font-medium ${
                  selected == categoria.id && `text-${corDestaque}`
                }`}
              >
                {categoria.categoriaNome}
              </span>
              {selected == categoria.id && (
                <Check className={`ml-auto stroke-${corDestaque}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-row justify-end">
        <Button
          onClick={handleInput}
          className="rounded-full font-medium items-center text-lg px-5 py-6 gap-2"
          variant={corDestaque}
        >
          Finalizar lançamento
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepCategoria;
