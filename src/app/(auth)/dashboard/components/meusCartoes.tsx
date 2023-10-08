import prisma from "@/lib/prisma";
import { mascaraMoeda } from "@/lib/utils";
import { sub, startOfDay, endOfDay, endOfToday } from "date-fns";
import Link from "next/link";

export const MeusCartoes = async () => {
  const contasCredito = await prisma.contas.findMany({
    where: {
      tipo: "Crédito",
    },
  });

  const contasComTotal = await Promise.all(
    contasCredito.map(async (conta) => {
      const diaFechamento = conta.fechamento || 1;

      const today = new Date(
        new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
      );
      const fechamento = sub(new Date().setUTCDate(diaFechamento), {
        months: 1,
      });

      fechamento.setUTCHours(0, 0, 0, 0);

      const lancamentos = await prisma.lancamentos.findMany({
        where: {
          contaId: conta.id,
          data: {
            lte: today,
            gte: fechamento,
          },
        },
      });

      const somatorioLancamentos = lancamentos.reduce(
        (total, lancamento) => total + Number(lancamento.valor),
        0
      );

      return {
        ...conta,
        somatorioLancamentos,
      };
    })
  );

  if (!contasComTotal) {
    return false;
  }

  return (
    <div className="flex flex-col">
      <span className="text-xl font-medium">Cartões de crédito</span>
      <div className="flex flex-row gap-3 overflow-x-scroll py-4 ">
        {contasComTotal.map((conta) => {
          return (
            <CardConta
              key={conta.id}
              name={conta.conta}
              valor={conta.somatorioLancamentos}
              conta={conta.id}
            />
          );
        })}
      </div>
    </div>
  );
};

type Cartao = {
  name: string;
  valor: number;
  conta: number;
};

const CardConta = ({ name, valor, conta }: Cartao) => {
  return (
    <Link
      href={`accounts/${conta}`}
      className="bg-white p-4 rounded-xl w-3/5 shrink-0 flex flex-col gap-2 shadow"
    >
      <span className="text-lg font-medium">{name}</span>
      <span className="font-medium text-despesa">R$ {mascaraMoeda(valor)}</span>
    </Link>
  );
};
