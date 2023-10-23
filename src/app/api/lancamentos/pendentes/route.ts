import { authOptions } from "@/lib/auth";
import { totalPendente } from "@/lib/dbActions/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const receita = await totalPendente({ userId, tipo: "Receita" });
  const despesa = await totalPendente({ userId, tipo: "Despesa" });

  return NextResponse.json({ receita, despesa });
};
