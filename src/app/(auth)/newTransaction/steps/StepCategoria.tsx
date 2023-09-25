"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categorias = [
  { id: 1, nome: "Casa", icon: "icon" },
  { id: 2, nome: "Educação", icon: "icon" },
  { id: 3, nome: "Lazer", icon: "icon" },
  { id: 4, nome: "Outros", icon: "icon" },
  { id: 5, nome: "Online", icon: "icon" },
  { id: 6, nome: "Restaureante", icon: "icon" },
  { id: 7, nome: "Saude", icon: "icon" },
  { id: 8, nome: "Servico", icon: "icon" },
  { id: 9, nome: "Supermercado", icon: "icon" },
  { id: 10, nome: "Viagem", icon: "icon" },
];

const StepCategoria = () => {
  const { handleNext, handleFormInput, form, corDestaque } =
    useContext(NewContext);
  const [selected, setSelected] = useState<Number>();
  const { tipo } = form;

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

      <div className="flex flex-col gap-4 overflow-scroll">
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
                {categoria.nome}
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
