import prisma from "./prisma";
import { format, lastDayOfMonth } from "date-fns";

export const getLancamentos = async () => {
  try {
    const lancamentos = await prisma.lancamentos.findMany({
      select: {
        id: true,
        descricao: true,
      },
    });

    return lancamentos;
  } catch (error) {
    return error;
  }
};

type createLancamento = {
  conta: number;
  valor: number;
  descricao: string;
  data: string | "";
  categoria: number;
  tipo: "Receita" | "Despesa";
  userId: number;
};

export const createLancamento = async (dados: createLancamento) => {
  const { tipo, valor, descricao, conta, data, categoria, userId } = dados;

  const lancamento = await prisma.lancamentos.create({
    data: {
      descricao,
      tipo,
      valor,
      data,
      contaId: conta,
      categoriaId: categoria,
      userId: userId,
    },
  });
  return lancamento;
};

export const saldoTotal = async (userId: number) => {
  const saldo = await prisma.lancamentos.groupBy({
    by: ["userId"],
    where: {
      conta: {
        tipo: {
          in: ["Dinheiro", "Débito"],
        },
      },
    },
    _sum: {
      valor: true,
    },
  });

  if (!saldo.length) {
    return 0;
  }

  return Number(saldo[0]._sum.valor || 0);
};

export const totalDespesasMes = async (userId: number) => {
  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const totalDespesas = await prisma.lancamentos.groupBy({
    by: ["userId"],
    where: {
      tipo: {
        equals: "Despesa",
      },
      userId: userId,
      data: {
        gte: new Date(firstDateOfMonth),
        lte: new Date(lastDateOfMonth),
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalDespesas[0]?._sum.valor)) || 0;
};

export const totalReceitasMes = async (userId: number) => {
  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const totalReceitas = await prisma.lancamentos.groupBy({
    by: ["userId"],
    where: {
      tipo: {
        equals: "Receita",
      },
      userId: userId,
      data: {
        gte: new Date(firstDateOfMonth),
        lte: new Date(lastDateOfMonth),
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalReceitas[0]?._sum.valor)) || 0;
};

export const totalCreditoMes = async (userId: number) => {
  const totalCredito = await prisma.lancamentos.groupBy({
    by: ["userId"],
    where: {
      tipo: {
        equals: "Despesa",
      },
      userId: userId,
      conta: {
        tipo: {
          equals: "Crédito",
        },
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalCredito[0]?._sum.valor)) || 0;
};

export const totalEconomiasMes = async (userId: number) => {
  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const totalEconomias = await prisma.lancamentos.groupBy({
    by: ["userId"],
    where: {
      tipo: {
        equals: "Receita",
      },
      userId: userId,
      data: {
        gte: new Date(firstDateOfMonth),
        lte: new Date(lastDateOfMonth),
      },
      conta: {
        tipo: {
          equals: "Poupança",
        },
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalEconomias[0]?._sum.valor)) || 0;
};
