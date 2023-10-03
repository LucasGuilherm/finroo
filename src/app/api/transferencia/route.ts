import { dadosForm } from "@/app/(auth)/transferencia/page";
import { authOptions } from "@/lib/auth";
import { atualizarSaldoConta } from "@/lib/dbActions/contas";
import { createLancamento, transferirSaldo } from "@/lib/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const data: dadosForm = await request.json();

  const lancamento = await transferirSaldo({
    contaEntrada: data.conta,
    valor: data.valor,
    contaSaida: data.contaSaida,
    userId: userId,
  });

  return NextResponse.json({ lancamento });
};
