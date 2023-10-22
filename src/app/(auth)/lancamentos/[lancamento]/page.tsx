import { authOptions } from "@/lib/auth";
import { mascaraMoeda } from "@/lib/utils";
import { getServerSession } from "next-auth";
import BtnExcluir from "./components/BtnExcluir";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import SwitchPago from "./components/SwitchPago";
import { getLancamentoById } from "@/lib/dbActions/lancamentos";

type LancamentoParams = {
  lancamento: string;
};

const Lancamento = async ({ params }: { params: LancamentoParams }) => {
  const session = await getServerSession(authOptions);

  const lancamento = await getLancamentoById({
    id: Number(params.lancamento),
    userId: Number(session?.user.id),
  });

  if (!lancamento) return;

  const {
    data,
    id,
    pago,
    descricao,
    valor,
    tipo,
    cartao,
    cartaoId,
    contaId,
    conta,
  } = lancamento;

  const dataLancamento = format(new Date(data), "dd/MM/yyyy");

  console.log(tipo);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div
        className={`w-32 h-32 ${
          tipo == "Despesa" ? "bg-despesa/70" : "bg-receita/70"
        } rounded-full`}
      />
      <h1 className="text-2xl font-medium">{descricao}</h1>
      <h2 className="text-3xl font-medium">
        R$ {mascaraMoeda(Math.abs(Number(valor)))}
      </h2>
      <span
        className={`font-medium text-base px-3 py-1 ${
          tipo == "Despesa" ? "bg-despesa/70" : "bg-receita/70"
        } rounded-full`}
      >
        {tipo}
      </span>

      <div className="flex flex-col w-full gap-2">
        {dataLancamento && (
          <>
            <Separator />
            <div className="flex flex-row items-center justify-between p-2 mx-10">
              <span className="font-medium">Data</span>
              <span className="font-medium text-lg">{dataLancamento}</span>
            </div>
          </>
        )}

        <Separator />

        <div className="flex flex-row items-center justify-between p-2 mx-10">
          <span className="font-medium">{cartaoId ? "Cartão" : "Conta"}</span>
          <span className="font-medium text-lg">
            {cartaoId ? cartao?.nome : conta?.conta}
          </span>
        </div>

        <Separator />

        {!!contaId && (
          <div className="flex flex-row items-center justify-between p-2 mx-10">
            <span className="font-medium">
              {tipo == "Receita" ? "Recebido" : "Pago"}
            </span>
            <SwitchPago checkedLancamento={pago} id={id} />
          </div>
        )}
      </div>

      <BtnExcluir id={id} />
    </div>
  );
};

export default Lancamento;
