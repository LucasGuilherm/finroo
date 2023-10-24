import { authOptions } from "@/lib/auth";
import { saldoTotal } from "@/lib/dbActions/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const saldo = await saldoTotal(Number(userId));

  return NextResponse.json({ saldo });
};
