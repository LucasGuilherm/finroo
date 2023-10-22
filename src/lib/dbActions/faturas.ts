import prisma from "../prisma";
import { atualizarSaldoConta } from "./contas";

export const pagarFatura = async ({
  userId,
  faturaId,
  valor,
  dataPagamento,
  contaPagamentoId,
}: {
  userId: number;
  faturaId: number;
  valor: number;
  dataPagamento: Date;
  contaPagamentoId: number;
}) => {
  const fatura = await prisma.fatura.findUnique({
    where: {
      id: faturaId,
      userId,
    },
  });

  if (!fatura) {
    return { error: "fatura não encontrada" };
  }

  if (fatura.valorPago >= fatura.valorTotal) {
    return { error: "fatura já paga" };
  }

  const pagamentoConta = await prisma.lancamentos.create({
    data: {
      descricao: "Pagamento fatura",
      tipo: "Despesa",
      valor: valor * -1,
      data: dataPagamento,
      contaId: contaPagamentoId,
      userId,
      categoriaId: 4,
    },
  });

  if (!pagamentoConta) {
    return { error: "Conta não encontrada" };
  }

  const pagamentoFatura = await prisma.pagamentosFatura.create({
    data: {
      faturaId,
      dataPagamento,
      valorPago: valor,
      userId,
      lancamentoId: pagamentoConta.id,
    },
  });

  await prisma.fatura.update({
    data: {
      valorPago: valor,
    },
    where: {
      id: faturaId,
    },
  });

  await atualizarSaldoConta({
    contaId: contaPagamentoId,
    userId,
  });

  return pagamentoFatura;
};

export const getFatura = async ({
  faturaId,
  userId,
}: {
  faturaId: number;
  userId: number;
}) => {
  const fatura = await prisma.fatura.findUnique({
    where: {
      id: faturaId,
      userId,
    },
  });

  return fatura;
};
