import { TransactionForm } from "@/app/(auth)/newTransaction/page";
import {
  atualizarSaldoConta,
  getContaById,
  getContaSaldo,
} from "./dbActions/contas";
import prisma from "./prisma";
import {
  endOfMonth,
  format,
  lastDayOfMonth,
  startOfMonth,
  sub,
  subHours,
} from "date-fns";

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

type createLancamento = TransactionForm & {
  userId: number;
};

export const createLancamento = async (dados: createLancamento) => {
  const { tipo, valor, descricao, conta, data, categoria, userId, pago } =
    dados;

  const lancamento = await prisma.lancamentos.create({
    data: {
      descricao,
      tipo,
      valor: tipo == "Despesa" ? valor * -1 : valor,
      data,
      contaId: conta,
      categoriaId: categoria,
      userId: userId,
      pago: pago,
    },
  });
  return lancamento;
};

export const saldoTotal = async (userId: number) => {
  const contasSaldo = await prisma.contas.aggregate({
    where: {
      tipo: {
        in: ["Dinheiro", "Débito"],
      },
    },
    _sum: {
      saldo: true,
    },
  });

  if (!contasSaldo._sum) {
    return 0;
  }

  return Number(contasSaldo._sum.saldo || 0);
};

export const totalDespesasMes = async (userId: number) => {
  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const totalDespesas = await prisma.lancamentos.aggregate({
    where: {
      tipo: {
        equals: "Despesa",
      },
      userId: userId,
      pago: true,
      data: {
        gte: new Date(firstDateOfMonth),
        lte: new Date(lastDateOfMonth),
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalDespesas?._sum.valor)) || 0;
};

export const totalReceitasMes = async (userId: number) => {
  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const totalReceitas = await prisma.lancamentos.aggregate({
    where: {
      tipo: {
        equals: "Receita",
      },
      userId: userId,
      pago: true,
      data: {
        gte: new Date(firstDateOfMonth),
        lte: new Date(lastDateOfMonth),
      },
    },
    _sum: {
      valor: true,
    },
  });

  return Math.abs(Number(totalReceitas?._sum.valor)) || 0;
};

export const totalCreditoMes = async (userId: number) => {
  const totalCredito = await prisma.lancamentos.aggregate({
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

  return Math.abs(Number(totalCredito?._sum.valor)) || 0;
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

type transferirSaldo = {
  contaSaida: number;
  contaEntrada: number;
  userId: number;
  valor: number;
};
export const transferirSaldo = async ({
  contaSaida,
  contaEntrada,
  userId,
  valor,
}: transferirSaldo) => {
  const saldoConta = await getContaSaldo({ contaId: contaSaida, userId });

  if (saldoConta < valor) {
    return { erro: "Saldo insuficiente!" };
  }

  const [infoContaSaida, infoContaEntrada] = await Promise.all([
    getContaById({ contaId: contaSaida, userId }),
    getContaById({ contaId: contaEntrada, userId }),
  ]);

  const saida = await createLancamento({
    categoria: 4,
    conta: contaSaida,
    data: new Date().toISOString(),
    descricao: `Transferencia para ${infoContaEntrada?.conta}`,
    tipo: "Transferencia",
    userId,
    valor: -Math.abs(valor),
    pago: true,
  });

  if (!saida) {
    return { erro: "Falha ao realizar transferencia, tente novamente." };
  }

  const entrada = await createLancamento({
    categoria: 4,
    conta: contaEntrada,
    data: new Date().toISOString(),
    descricao: `Transferencia de ${infoContaSaida?.conta}`,
    tipo: "Transferencia",
    userId,
    valor: Math.abs(valor),
    pago: true,
  });

  if (!entrada) {
    await prisma.lancamentos.delete({
      where: {
        id: saida.id,
      },
    });
  }

  const [saldoEntrada, saldoSaida] = await Promise.all([
    atualizarSaldoConta({ contaId: contaEntrada, userId }),
    atualizarSaldoConta({ contaId: contaSaida, userId }),
  ]);

  return { success: true };
};

export const totalPendente = async () => {
  const dataIni = new Date(startOfMonth(new Date()).setUTCHours(0));
  const dataFim = subHours(new Date(endOfMonth(new Date())), 3);

  const pendente = await prisma.lancamentos.groupBy({
    by: ["tipo"],
    where: {
      tipo: {
        in: ["Despesa", "Receita"],
      },
      // data: {
      //   gte: dataIni,
      //   lte: dataFim,
      // },
      pago: false,
    },
    _sum: {
      valor: true,
    },
  });

  return pendente;
};

export const getLancamentosPendentes = async <T = unknown>({
  tipo,
}: {
  tipo: "Receita" | "Despesa";
}) => {
  const dataIni = new Date(startOfMonth(new Date()).setUTCHours(0));
  const dataFim = subHours(new Date(endOfMonth(new Date())), 3);

  const lancamentosPendentes = await prisma.lancamentos.findMany({
    select: {
      data: true,
      descricao: true,
      tipo: true,
      valor: true,
      id: true,
    },
    where: {
      pago: false,
      data: {
        gte: dataIni,
        lte: dataFim,
      },
      tipo: tipo,
    },
  });

  return lancamentosPendentes as T;
};

type setLancamentoPago = {
  id: number;
  pago: boolean;
  userId: number;
};

export const setLancamentoPago = async ({
  id,
  pago,
  userId,
}: setLancamentoPago) => {
  const today = new Date().toISOString();

  const lancamento = await prisma.lancamentos.update({
    data: {
      pago: pago,
      data: today,
    },
    where: {
      id: id,
    },
  });

  if (lancamento) {
    await atualizarSaldoConta({
      contaId: lancamento.contaId,
      userId,
    });
  }

  return lancamento;
};
