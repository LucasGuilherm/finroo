import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { mascaraMoeda } from "@/lib/utils";
import { getCartaoId } from "@/lib/dbActions/cartoes";
import prisma from "@/lib/prisma";
import { add, format, set, startOfDay, sub } from "date-fns";
import FaturaCartao from "./components/listaFaturas";
import { Prisma } from "@prisma/client";

type pageProps = {
  params: { cartao: string };
};

const Cartao = async ({ params }: pageProps) => {
  const session = await getServerSession(authOptions);

  const cartao = await getCartaoId({
    cartaoId: Number(params.cartao),
    userId: Number(session?.user.id),
  });

  if (!cartao) {
    return <h1>Cartao n existe</h1>;
  }

  const info = await buscaFaturasComLancamentos({
    cartaoId: cartao.id,
    userId: Number(session?.user.id),
    diaFechamento: cartao.diaFechamento,
  });

  if (!info) return;

  const { faturas, faturasComLancamentos } = info;

  const listaMesesFaturas = faturas.map((fatura) => {
    return format(fatura.dataFechamento, "yyyy-MM-dd");
  });

  return (
    <>
      <FaturaCartao
        cartao={cartao}
        faturas={listaMesesFaturas}
        faturaComLancamentos={faturasComLancamentos}
      />
    </>
  );
};

type FaturasLancamentos = {
  cartaoId: number;
  diaFechamento: number;
  userId: number;
};

const buscaFaturasComLancamentos = async ({
  cartaoId,
  userId,
  diaFechamento,
}: FaturasLancamentos) => {
  const dataReferencia = sub(
    startOfDay(set(new Date(), { date: diaFechamento })),
    {
      hours: 3,
    }
  );

  const dataIni = sub(dataReferencia, { months: 12 });
  const dataFim = add(dataReferencia, { months: 12 });

  const faturas = await prisma.fatura.findMany({
    where: {
      userId,
      cartaoId,
      valorTotal: {
        gt: 0,
      },
      dataFechamento: {
        gte: dataIni,
      },
    },
    orderBy: {
      dataFechamento: "asc",
    },
  });

  const faturaMinima = await prisma.fatura.findFirst({
    select: {
      dataFechamento: true,
    },
    where: {
      userId,
      cartaoId,
      dataFechamento: {
        gte: dataIni,
      },
    },
    orderBy: {
      dataFechamento: "asc",
    },
  });

  if (!faturaMinima) return;

  const datatemp = sub(faturaMinima?.dataFechamento, { months: 1 });

  const lancamentos = await prisma.lancamentos.findMany({
    where: {
      userId,
      cartaoId,
      data: {
        gte: datatemp,
      },
    },
  });

  const faturasComLancamentos = faturas.map((fatura) => {
    const lancamentosDaFatura = [];
    for (let i = lancamentos.length - 1; i >= 0; i--) {
      if (
        lancamentoPertenceAFatura({
          lancamento: lancamentos[i],
          fatura: fatura,
        })
      ) {
        lancamentosDaFatura.push(lancamentos[i]);
        lancamentos.splice(i, 1); // Remove o lançamento do array original
      }
    }
    return {
      ...fatura,
      lancamentos: lancamentosDaFatura,
    };
  });

  return { faturasComLancamentos, faturas };
};

type lancamentoPertenceAFatura = {
  lancamento: {
    data: Date;
  };
  fatura: {
    dataFechamento: Date;
  };
};

function lancamentoPertenceAFatura({
  lancamento,
  fatura,
}: lancamentoPertenceAFatura) {
  const dataLancamento = new Date(lancamento.data);
  const dataFechamento = new Date(fatura.dataFechamento);
  dataFechamento.setMonth(dataFechamento.getMonth() - 1);

  if (
    dataLancamento >= dataFechamento &&
    dataLancamento <= new Date(fatura.dataFechamento)
  ) {
    return true;
  }
  return false;
}

export type fatura = {
  id: number;
  valorTotal: Prisma.Decimal;
  valorPago: Prisma.Decimal;
  dataVencimento: Date;
  dataFechamento: Date;
  cartaoId: number;
  userId: number;
  lancamentos?: lancamento[];
};

export type lancamento = {
  id: number;
  tipo: string;
  descricao: string;
  valor: Prisma.Decimal;
  data: Date;
  pago: boolean;
  contaId: number | null;
  cartaoId: number | null;
  categoriaId: number;
  userId: number;
};

export type faturaComLancamentos = fatura & {
  lancamentos: lancamento[];
};

export type cartao = {
  id: number;
  nome: string;
  limite: Prisma.Decimal;
  diaFechamento: number;
  diaVencimento: number;
  userId: number;
};

export default Cartao;
