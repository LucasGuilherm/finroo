import prisma from "@/lib/prisma";

export const getContasUser = async (userId: number) => {
  const contas = await prisma.contas.findMany({
    where: {
      userId: userId,
    },
  });

  return contas;
};

type getContaProps = {
  conta: string;
  userId: number;
};

export const getContaByNameAndUser = async ({
  conta,
  userId,
}: getContaProps) => {
  const contaDB = await prisma.contas.findFirst({
    where: {
      conta,
      userId,
    },
  });

  return contaDB;
};

type getContaIdProps = {
  contaId: number;
  userId: number;
};
export const getContaById = async ({ contaId, userId }: getContaIdProps) => {
  const contaDB = await prisma.contas.findFirst({
    where: {
      id: contaId,
      userId,
    },
  });

  return contaDB;
};

type createContaUserProps = {
  conta: string;
  userId: number;
  tipo: string;
};

export const createContaUser = async (novaConta: createContaUserProps) => {
  const { conta, userId, tipo } = novaConta;

  const newConta = await prisma.contas.create({
    data: {
      conta,
      userId,
      tipo,
    },
  });

  return newConta;
};

type getContaSaldo = {
  contaId: number;
  userId: number;
};
export const getContaSaldo = async ({ contaId, userId }: getContaSaldo) => {
  const saldoCalc = await prisma.lancamentos.aggregate({
    where: {
      userId: userId,
      contaId: contaId,
      pago: true,
    },
    _sum: {
      valor: true,
    },
  });

  return Number(saldoCalc._sum.valor || 0);
};

type atualizarSaldoConta = {
  contaId: number;
  userId: number;
};
export const atualizarSaldoConta = async ({
  contaId,
  userId,
}: atualizarSaldoConta) => {
  const saldoCalc = await getContaSaldo({ contaId, userId });

  const saldoConta = await prisma.contas.update({
    where: {
      userId: userId,
      id: contaId,
    },
    data: {
      saldo: Number(saldoCalc),
    },
  });

  return saldoConta.saldo;
};
