import { ShoppingCart } from "lucide-react";
import { lancamento } from "../page";
import { format } from "date-fns";
import { mascaraMoeda } from "@/lib/utils";

type ListaLancamentosProps = {
  lancamentos: lancamento[];
};

const ListaLancamentos = ({ lancamentos }: ListaLancamentosProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {lancamentos.map((lancamento) => {
          const { id, descricao, valor, tipo, data } = lancamento;

          return (
            <ItemLancamentoLista
              key={id}
              data={format(data, "MMM dd")}
              descricao={descricao}
              valor={Number(valor)}
              tipo={"Despesa"}
            />
          );
        })}
      </div>
    </>
  );
};

type itemProps = {
  valor: number;
  descricao: string;
  data: string;
  tipo: "Despesa" | "Receita";
};

const ItemLancamentoLista = ({ valor, descricao, tipo, data }: itemProps) => {
  const valorFormat = mascaraMoeda(Number(valor));

  return (
    <li className="flex items-center gap-4">
      <div
        className={`${
          tipo == "Despesa" ? "bg-despesa/70" : "bg-receita/70"
        } rounded-full p-3 flex items-center justify-center`}
      >
        <ShoppingCart size={24} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-medium">{descricao}</h1>
        <span className="text-xs">{data}</span>
      </div>

      <span className="ml-auto self-start font-medium text-lg whitespace-nowrap">
        R$ {valorFormat}
      </span>
    </li>
  );
};

export default ListaLancamentos;
