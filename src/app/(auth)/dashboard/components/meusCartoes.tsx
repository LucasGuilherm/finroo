import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { mascaraMoeda } from "@/lib/utils";
import { sub, startOfDay, endOfDay, endOfToday } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const MeusCartoes = async () => {
  const session = await getServerSession(authOptions);

  const cartoesCredito = await prisma.cartoes.findMany({
    where: {
      userId: Number(session?.user.id),
    },
    include: {
      Fatura: {
        where: {
          dataFechamento: {
            gt: new Date(),
          },
        },
        take: 1,
        orderBy: {
          dataFechamento: "asc",
        },
      },
    },
  });

  // const cartoesComTotal = await Promise.all(
  //   cartoesCredito.map(async (cartao) => {
  //     const diaFechamento = cartao.diaFechamento || 1;

  //     const today = new Date(
  //       new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
  //     );
  //     const fechamento = sub(new Date().setUTCDate(diaFechamento), {
  //       months: 1,
  //     });

  //     fechamento.setUTCHours(0, 0, 0, 0);

  //     const lancamentos = await prisma.lancamentos.findMany({
  //       where: {
  //         userId: Number(session?.user.id),
  //         cartaoId: cartao.id,
  //         data: {
  //           gte: fechamento,
  //           lte: today,
  //         },
  //       },
  //     });

  //     const somatorioLancamentos = lancamentos.reduce(
  //       (total, lancamento) => total + Number(lancamento.valor),
  //       0
  //     );

  //     return {
  //       ...cartao,
  //       somatorioLancamentos,
  //     };
  //   })
  // );

  // if (!cartoesComTotal.length) {
  //   return false;
  // }

  return (
    <div className="flex flex-col">
      <span className="text-xl font-medium">Cartões de crédito</span>
      <div className="flex flex-row gap-3 overflow-x-scroll py-4 no-scrollbar">
        {cartoesCredito.map((cartao) => {
          return (
            <CardCartao
              key={cartao.id}
              name={cartao.nome}
              valor={Number(cartao.Fatura[0].valorTotal)}
              conta={cartao.id}
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

const CardCartao = ({ name, valor, conta }: Cartao) => {
  return (
    <Link
      href={{
        pathname: `accounts/cartoes/${conta}`,
        query: { tipo: "cartao" },
      }}
      className="bg-white p-4 rounded-xl w-3/5 shrink-0 flex flex-col gap-2 shadow"
    >
      <span className="text-lg font-medium">{name}</span>
      <span className="font-medium text-despesa">R$ {mascaraMoeda(valor)}</span>
    </Link>
  );
};
