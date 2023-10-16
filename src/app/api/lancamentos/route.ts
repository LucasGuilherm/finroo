import { TransactionForm } from "@/app/(auth)/newTransaction/page";
import { authOptions } from "@/lib/auth";
import { atualizarFaturaCartao } from "@/lib/dbActions/cartoes";
import { atualizarSaldoConta } from "@/lib/dbActions/contas";
import { createLancamento } from "@/lib/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const data: TransactionForm = await request.json();

  const lancamento = await createLancamento({ ...data, userId });

  // if (data.conta) {
  //   await atualizarSaldoConta({
  //     contaId: data.conta,
  //     userId,
  //   });
  // }

  // if (data.cartao) {
  //   await atualizarFaturaCartao({
  //     cartaoId: data.cartao,
  //     userId,
  //     dataReferencia: new Date(data.data),
  //   });
  // }

  return NextResponse.json({ lancamento });
};
