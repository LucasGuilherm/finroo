"use client";

import { useContext, useState } from "react";
import { NewContext } from "../NewContext";
import { Button } from "@/components/ui/button";
import {
  Book,
  BookIcon,
  BookOpen,
  Check,
  ChevronRight,
  Heart,
  Home,
  HomeIcon,
  LucideBookOpen,
  MoreHorizontal,
  Plane,
  ShoppingBag,
  ShoppingCart,
  Sofa,
  Soup,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchWrap";
import Loading from "../../loading";
import { ItemCategoria } from "../components/itemCategoria";

export type categoria = {
  id: number;
  categoria: string;
  icone: string;
};

const getCategorias = async () => {
  return await fetchApi<categoria[]>("/categorias");
};

const StepCategoria = () => {
  const { handleNext, handleFormInput, form, corDestaque } =
    useContext(NewContext);
  const [selected, setSelected] = useState(0);
  const { tipo } = form;

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });

  if (!categorias) {
    return <Loading />;
  }

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
            <ItemCategoria
              key={categoria.id}
              categoria={categoria}
              corDestaque={corDestaque}
              onClick={handleSelected}
              selected={selected}
            />
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
