import { authOptions } from "@/lib/auth";
import { setLancamentoPago } from "@/lib/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const data: { id: number; pago: boolean } = await request.json();

  const lancamento = await setLancamentoPago({ ...data, userId });

  return NextResponse.json({ lancamento });
};
