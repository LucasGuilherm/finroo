"use client";

import { addHours, format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { itemPendente } from "../page";
import ItemLista from "./itemLista";
import { useEffect, useRef, useState } from "react";
import ListaMeses from "./listaMeses";

type ListaPendentesProps = {
  listaPendentes: itemPendente[];
  titulo: string;
  tipo: string;
};

const ListaPendentes = ({
  listaPendentes,
  titulo,
  tipo,
}: ListaPendentesProps) => {
  let mesesLista: string[] = [];

  for (const element of listaPendentes) {
    const dataTemp = startOfMonth(addHours(element.data, 3));
    const formated = format(dataTemp, "yyyy-MM-dd", { locale: ptBR });

    if (mesesLista.indexOf(formated) == -1) {
      mesesLista.push(formated);
    }
  }

  const [selected, setSelected] = useState(mesesLista[0]);

  const handleSetSelected = (data: string) => {
    setSelected(data);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Contas a {titulo}</h2>
      </div>

      <ListaMeses
        tipo={tipo}
        mesesLista={mesesLista}
        onClick={handleSetSelected}
      />

      <div className="w-full flex flex-col gap-3">
        {listaPendentes.map((lancamento) => {
          const { id, valor, descricao, tipo, data } = lancamento;

          if (selected != format(startOfMonth(data), "yyyy-MM-dd")) {
            return;
          }

          return (
            <ItemLista
              key={id}
              id={id}
              valor={Math.abs(Number(valor))}
              descricao={descricao}
              tipo={tipo}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListaPendentes;
