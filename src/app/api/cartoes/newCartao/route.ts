import { ContaForm } from "@/app/(auth)/newAccount/page";
import { authOptions } from "@/lib/auth";
import {
  createCartaoUser,
  getCartaoByNameAndUser,
} from "@/lib/dbActions/cartoes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  if (!userId) {
    return NextResponse.json({ message: "Error" });
  }

  const { nome, fechamento, vencimento }: ContaForm = await req.json();

  const cartaoExiste = await getCartaoByNameAndUser({
    nome,
    userId,
  });

  if (cartaoExiste) {
    return NextResponse.json({ message: "Cartao já existe" });
  }

  const novoCartao = await createCartaoUser({
    nome: nome,
    userId,
    diaFechamento: fechamento,
    diaVencimento: vencimento,
  });

  return NextResponse.json({ novoCartao });
};
