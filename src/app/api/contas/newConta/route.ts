import { ContaForm } from "@/app/(auth)/newAccount/page";
import { authOptions } from "@/lib/auth";
import { createContaUser, getContaByNameAndUser } from "@/lib/dbActions/contas";
import { createLancamento } from "@/lib/dbActions/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  if (!userId) {
    return NextResponse.json({ message: "Error" });
  }

  const { nome, tipo, saldoInicial }: ContaForm = await req.json();

  const contaExiste = await getContaByNameAndUser({
    conta: nome,
    userId: userId,
  });

  if (contaExiste) {
    return NextResponse.json({ message: "Conta já existe" });
  }

  const novaConta = await createContaUser({
    conta: nome,
    userId,
    tipo,
  });

  if (saldoInicial) {
    await createLancamento({
      categoria: 4,
      conta: novaConta.id,
      data: new Date(),
      descricao: "Saldo Inicial",
      tipo: "Receita",
      userId: userId,
      valor: Number(saldoInicial),
      pago: true,
      cartao: 0,
      vezes: 1,
    });
  }

  return NextResponse.json({ novaConta });
};
