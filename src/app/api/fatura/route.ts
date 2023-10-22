import { authOptions } from "@/lib/auth";
import { getFatura } from "@/lib/dbActions/faturas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const { searchParams } = new URL(request.url);
  const faturaId = searchParams.get("faturaId");

  const fatura = await getFatura({ faturaId: Number(faturaId), userId });

  return NextResponse.json({ ...fatura });
};
