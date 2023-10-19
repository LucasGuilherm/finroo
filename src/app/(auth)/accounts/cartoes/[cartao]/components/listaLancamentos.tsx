import { lancamento } from "../page";
import { format } from "date-fns";
import ItemLancamentoLista from "@/components/itemListaLancamento";

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
              id={id}
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

export default ListaLancamentos;
