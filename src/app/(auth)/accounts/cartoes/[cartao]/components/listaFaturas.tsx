"use client";

import ListaMeses from "@/app/(auth)/pendentes/components/listaMeses";
import { useState } from "react";
import { cartao, faturaComLancamentos } from "../page";
import ListaLancamentos from "./listaLancamentos";
import { format } from "date-fns";
import { mascaraMoeda } from "@/lib/utils";
import ButtonPagarFatura from "./btnPagarFatura";

type props = {
  cartao: cartao;
  faturas: string[];
  faturaComLancamentos: faturaComLancamentos[];
};

const FaturaCartao = ({ faturas, faturaComLancamentos, cartao }: props) => {
  const [mesSelect, setMesSelect] = useState(faturas[0]);

  const handleClick = (data: string) => {
    setMesSelect(data);
  };

  const listaFiltrada = faturaComLancamentos.filter((fatuta) => {
    return format(fatuta.dataFechamento, "yyyy-MM-dd") == mesSelect;
  });

  const { valorTotal, valorPago } = listaFiltrada[0];
  const valorAberto = Number(valorTotal) - Number(valorPago);

  return (
    <>
      <div className="flex flex-col items-center gap-6 my-3">
        <h1 className="text-2xl font-medium">{cartao?.nome}</h1>

        <span className="text-4xl font-medium">
          R$ {mascaraMoeda(valorAberto)}
        </span>
        <div className="flex flex-col">
          <span>Valor total: R$ {mascaraMoeda(Number(valorTotal))}</span>
          <span>Valor pago: R$ {mascaraMoeda(Number(valorPago))}</span>
        </div>

        {valorAberto != 0 && (
          <ButtonPagarFatura faturaId={listaFiltrada[0].id} />
        )}
      </div>

      <div className="w-full flex flex-col gap-6 items-center">
        <div className="flex flex-row items-center gap-2 justify-between w-full">
          <h2 className="text-xl">Faturas</h2>
          <ListaMeses
            mesesLista={faturas}
            tipo="despesa"
            onClick={handleClick}
          />
        </div>
        <ListaLancamentos lancamentos={listaFiltrada[0].lancamentos} />
      </div>
    </>
  );
};

export default FaturaCartao;
