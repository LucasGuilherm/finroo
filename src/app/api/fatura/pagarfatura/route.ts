import { authOptions } from "@/lib/auth";
import { pagarFatura } from "@/lib/dbActions/faturas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  type pagarFaturaProps = {
    faturaId: number;
    valor: number;
    dataPagamento: Date;
    contaPagamentoId: number;
  };

  const { contaPagamentoId, dataPagamento, faturaId, valor }: pagarFaturaProps =
    await request.json();

  const fatura = await pagarFatura({
    userId,
    contaPagamentoId,
    dataPagamento,
    faturaId,
    valor,
  });

  if ("error" in fatura) {
    return NextResponse.json({ error: fatura.error }, { status: 400 });
  }

  return NextResponse.json({ fatura });
};
