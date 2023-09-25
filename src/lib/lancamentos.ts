import { FormInputs } from "@/app/(auth)/newTransaction/NewContext";
import prisma from "./prisma";

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

export const createLancamento = async (dados: FormInputs) => {
  const { tipo, valor, descricao, conta, data } = dados;

  const lancamento = await prisma.lancamentos.create({
    data: {
      descricao,
      tipo,
      valor,
      data,
      contaId: conta,
    },
  });
  return lancamento;
};
