import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/fetchWrap";
import { mascaraMoeda } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type RequestProps = {
  id: number;
  pago: boolean;
};

const setLancamentoPago = async (info: RequestProps) => {
  const status = await fetchApi("/lancamentos/setPago", {
    method: "POST",
    body: JSON.stringify(info),
  });
};

type ItemProp = {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
};

const ItemLista = ({ id, tipo, descricao, valor }: ItemProp) => {
  const btnTitle = tipo == "Despesa" ? "Pagar" : "Receber";
  const tipoTemp = tipo == "Despesa" ? "despesa" : "receita";

  const [cancel, setCancel] = useState(false);

  const mutationSubmit = useMutation({
    mutationFn: () => setLancamentoPago({ id: id, pago: true }),
  });

  const mutationCancel = useMutation({
    mutationFn: () => setLancamentoPago({ id: id, pago: false }),
  });

  const handleSubmit = () => {
    mutationSubmit.mutate();

    setCancel(true);
  };

  const handleCancel = () => {
    mutationCancel.mutate();

    setCancel(false);
  };

  const handleClick = () => {
    if (cancel) {
      handleCancel();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-4 p-2 px-3 bg-white rounded-xl shadow">
      <div className="flex flex-col">
        <h3 className="font-medium text-lg">{descricao}</h3>
        <span className={`font-semibold text-lg text-${tipo.toLowerCase()}`}>
          R$ {mascaraMoeda(valor)}
        </span>
      </div>

      <Button
        onClick={handleClick}
        variant={cancel ? "destructive" : tipoTemp}
        className="rounded-full ml-auto"
      >
        {cancel ? "Cancelar" : btnTitle}
      </Button>
    </div>
  );
};

export default ItemLista;
