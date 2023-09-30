import { cn } from "@/lib/utils";
import { categoria } from "../steps/StepCategoria";
import { Check } from "lucide-react";

type ItemCategoriaProps = {
  categoria: categoria;
  selected: number;
  corDestaque: "despesa" | "receita";
  onClick: (id: number) => void;
};

export const ItemCategoria = ({
  categoria,
  selected,
  corDestaque,
  onClick,
}: ItemCategoriaProps) => {
  // <Home />
  // <BookOpen />
  // <Sofa />
  // <MoreHorizontal />
  // <ShoppingBag />
  // <Soup />
  // <Heart />
  // <Wrench />
  // <ShoppingCart />
  // <Plane />

  return (
    <div
      key={categoria.id}
      onClick={() => onClick(categoria.id)}
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
        {categoria.categoria}
      </span>
      {selected == categoria.id && (
        <Check className={`ml-auto stroke-${corDestaque}`} />
      )}
    </div>
  );
};
