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

  if (!cartoesCredito.length) {
    return;
  }

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
