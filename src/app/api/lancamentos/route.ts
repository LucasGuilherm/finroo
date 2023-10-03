import { FormInputs } from "@/app/(auth)/newTransaction/NewContext";
import { authOptions } from "@/lib/auth";
import { atualizarSaldoConta } from "@/lib/dbActions/contas";
import { createLancamento } from "@/lib/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const data: FormInputs = await request.json();

  const lancamento = await createLancamento({ ...data, userId });

  const saldoConta = await atualizarSaldoConta({
    contaId: data.conta,
    userId,
  });

  return NextResponse.json({ lancamento });
};
