import { FormInputs } from "@/app/(auth)/newAccount/NewContext";
import { authOptions } from "@/lib/auth";
import { createContaUser, getContaByNameAndUser } from "@/lib/dbActions/contas";
import { createLancamento } from "@/lib/lancamentos";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  if (!userId) {
    return NextResponse.json({ message: "Error" });
  }

  const { descricao, tipo, fechamento, saldoInicial, vencimento }: FormInputs =
    await req.json();

  const contaExiste = await getContaByNameAndUser({
    conta: descricao,
    userId: userId,
  });

  if (contaExiste) {
    return NextResponse.json({ message: "Conta já existe" });
  }

  const novaConta = await createContaUser({
    conta: descricao,
    userId,
    tipo,
    fechamento,
    vencimento,
  });

  if (tipo !== "Crédito") {
    const saldoInicialConta = await createLancamento({
      categoria: 4,
      conta: novaConta.id,
      data: new Date().toISOString(),
      descricao: "Saldo Inicial",
      tipo: "Receita",
      userId: userId,
      valor: Number(saldoInicial),
      pago: true,
    });
  }

  return NextResponse.json({ novaConta });
};
