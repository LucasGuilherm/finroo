import { authOptions } from "@/lib/auth";
import { getContaByNameAndUser, getContasUser } from "@/lib/dbActions/contas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const listaContas = await getContasUser(Number(userId));

  return NextResponse.json({ listaContas });
};
