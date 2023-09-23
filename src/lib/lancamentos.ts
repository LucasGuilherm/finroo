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

export const createLancamento = async ({
  descricao,
}: {
  descricao: string;
}) => {
  // const lancamento = await prisma.lancamentos.create({
  //   data: {
  //     descricao: "123123",
  //   },
  // });
  // return lancamento;
};
