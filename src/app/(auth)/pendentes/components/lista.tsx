"use client";

import { addHours, format, getMonth, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { itemPendente } from "../page";
import ItemLista from "./itemLista";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";

type ListaPendentesProps = {
  listaPendentes: itemPendente[];
  titulo: string;
};

const ListaPendentes = ({ listaPendentes, titulo }: ListaPendentesProps) => {
  let mesesLista: string[] = [];

  for (const element of listaPendentes) {
    const dataTemp = startOfMonth(addHours(element.data, 3));
    const formated = format(dataTemp, "yyyy-MM-dd", { locale: ptBR });

    if (mesesLista.indexOf(formated) == -1) {
      mesesLista.push(formated);
    }
  }

  const [selected, setSelected] = useState(mesesLista[0]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Contas a {titulo}</h2>
        <Select
          onValueChange={(valor) => setSelected(valor)}
          defaultValue={mesesLista[0]}
        >
          <SelectTrigger className="w-fit gap-2 bg-transparent font-medium text-xl">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {mesesLista.map((data) => {
              const dataFormated = format(
                addHours(new Date(data), 3),
                "MMM. yy",
                {
                  locale: ptBR,
                }
              );

              return (
                <SelectItem key={data} value={data}>
                  {dataFormated}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

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
