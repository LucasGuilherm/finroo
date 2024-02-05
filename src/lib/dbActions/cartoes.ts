import prisma from "@/lib/prisma";
import {
  addDays,
  addHours,
  addMonths,
  getDate,
  set,
  setDate,
  setHours,
  startOfDay,
  subHours,
  subMonths,
} from "date-fns";

type createCartaoUserProps = {
  nome: string;
  userId: number;
  diaFechamento: number;
  diaVencimento: number;
};

export const createCartaoUser = async (novoCartao: createCartaoUserProps) => {
  const { nome, userId, diaFechamento, diaVencimento } = novoCartao;

  const diaAtual = subHours(new Date(), 3);
  let dataFechamento = set(setDate(diaAtual, diaFechamento), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  let dataVencimento = set(setDate(diaAtual, diaVencimento), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  if (getDate(diaAtual) < diaFechamento) {
    dataFechamento = dataFechamento;
    dataVencimento = dataVencimento;
  } else {
    dataFechamento = addMonths(dataFechamento, 1);
    dataVencimento = addMonths(dataVencimento, 1);
  }

  dataFechamento = subHours(dataFechamento, 3);
  dataVencimento = subHours(dataVencimento, 3);

  const newCartao = await prisma.cartoes.create({
    data: {
      nome,
      userId,
      diaFechamento,
      diaVencimento,
      Fatura: {
        create: {
          valorTotal: 0,
          valorPago: 0,
          dataFechamento: dataFechamento,
          dataVencimento: dataVencimento,
          userId: userId,
        },
      },
    },
  });

  return newCartao;
};

type getCartaoProps = {
  nome: string;
  userId: number;
};

export const getCartaoByNameAndUser = async ({
  nome,
  userId,
}: getCartaoProps) => {
  const cartaoDB = await prisma.cartoes.findFirst({
    where: {
      nome,
      userId,
    },
  });

  return cartaoDB;
};

export const getCartoesUser = async (userId: number) => {
  const cartoes = await prisma.cartoes.findMany({
    where: {
      userId: userId,
    },
  });

  return cartoes;
};

type getCartaoIdProps = {
  cartaoId: number;
  userId: number;
};

export const getCartaoId = async ({ cartaoId, userId }: getCartaoIdProps) => {
  const contaDB = await prisma.cartoes.findFirst({
    where: {
      id: cartaoId,
      userId,
    },
  });

  return contaDB;
};

type atualizarFaturaCartao = {
  cartaoId: number;
  userId: number;
  dataReferencia: Date;
};

export const atualizarFaturaCartao = async ({
  cartaoId,
  userId,
  dataReferencia,
}: atualizarFaturaCartao) => {
  const cartao = await prisma.cartoes.findUnique({
    where: {
      id: cartaoId,
      userId,
    },
  });

  if (!cartao) return;

  let dataFatura = startOfDay(
    setDate(new Date(dataReferencia), cartao.diaFechamento)
  );

  if (getDate(dataReferencia) < cartao.diaFechamento) {
    dataFatura = dataFatura;
  } else {
    dataFatura = addMonths(dataFatura, 1);
  }

  dataFatura = subHours(dataFatura, 3);

  let fatura = await prisma.fatura.findFirst({
    where: {
      cartaoId,
      userId,
      dataFechamento: dataFatura,
    },
  });

  if (!fatura) {
    const dataVencimento = addDays(
      dataFatura,
      cartao.diaVencimento - cartao.diaFechamento
    );

    fatura = await prisma.fatura.create({
      data: {
        cartaoId,
        userId,
        valorPago: 0,
        valorTotal: 0,
        dataFechamento: dataFatura,
        dataVencimento: dataVencimento,
      },
    });
  }

  const dataIni = subMonths(dataFatura, 1);
  const dataFim = dataFatura;

  const totalFatura = await prisma.lancamentos.aggregate({
    where: {
      tipo: "Despesa",
      cartaoId,
      data: {
        gte: dataIni,
        lt: dataFim,
      },
    },
    _sum: {
      valor: true,
    },
  });

  const valorTotal = Number(totalFatura._sum.valor);

  await prisma.fatura.update({
    data: {
      valorTotal: Math.abs(valorTotal),
    },
    where: {
      cartaoId,
      id: fatura.id,
    },
  });
};

type pegaFatura = {
  cartaoId: number;
  dataFechamento: Date;
  userId: number;
};
export const pegaFatura = async ({
  cartaoId,
  dataFechamento,
  userId,
}: pegaFatura) => {
  const date = set(dataFechamento, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const fatura = await prisma.fatura.findFirst({
    where: {
      cartaoId,
      userId,
      dataFechamento: date,
    },
  });

  return fatura;
};

type novaFatura = {
  cartaoId: number;
  dataFechamento: Date;
  dataVencimento: Date;
  userId: number;
};

export const criaFatura = async ({
  cartaoId,
  dataFechamento,
  dataVencimento,
  userId,
}: novaFatura) => {
  const fatura = await prisma.fatura.create({
    data: {
      valorPago: 0,
      valorTotal: 0,
      userId,
      dataFechamento: dataFechamento,
      dataVencimento: dataVencimento,
      cartaoId,
    },
  });

  return fatura;
};

// export const faturaLancamentos = async () => {
//   const faturasLancamentos = await prisma.$queryRaw(
//     Prisma.sql`Select * from Faturas where date(data)`
//   )
// }
