import { authOptions } from "@/lib/auth";
import {
  createLancamento,
  deleteLancamento,
} from "@/lib/dbActions/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const data: { id: number } = await request.json();

  const lancamento = await deleteLancamento({ userId, id: data.id });

  return NextResponse.json({ lancamento });
};
