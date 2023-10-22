import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

type ListaMesesprops = {
  mesesLista: string[];
  onClick: (data: string) => void;
  tipo: string;
};

const ListaMeses = ({ mesesLista, onClick, tipo }: ListaMesesprops) => {
  const [selected, setSelected] = useState(mesesLista[0]);

  type handleClick = {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    data: string;
  };
  const handleClick = ({ e, data }: handleClick) => {
    setSelected(data);
    onClick(data);
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <div className="flex flex-row overflow-x-scroll no-scrollbar">
      {mesesLista.map((data) => {
        const dataFormated = format(addHours(new Date(data), 3), "MMM yy", {
          locale: ptBR,
        });

        return (
          <div
            onClick={(e) => handleClick({ e, data })}
            className={`px-4 py-2 rounded-full whitespace-nowrap w-fit ${
              selected == data && `bg-${tipo.toLowerCase()} font-medium`
            }`}
            key={data}
          >
            {dataFormated}
          </div>
        );
      })}
    </div>
  );
};

export default ListaMeses;
