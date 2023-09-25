import prisma from "@/lib/prisma";

export const getContasUser = async (userId: number) => {
  console.log(userId);

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

type createContaUserProps = {
  conta: string;
  userId: number;
  tipo: string;
  fechamento?: number;
  vencimento?: number;
};

export const createContaUser = async (novaConta: createContaUserProps) => {
  const { conta, userId, tipo, fechamento, vencimento } = novaConta;

  const newConta = await prisma.contas.create({
    data: {
      conta,
      userId,
      tipo,
      fechamento,
      vencimento,
    },
  });

  return newConta;
};
