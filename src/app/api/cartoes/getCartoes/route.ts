import { authOptions } from "@/lib/auth";
import { getCartoesUser } from "@/lib/dbActions/cartoes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const listaCartoes = await getCartoesUser(Number(userId));

  return NextResponse.json({ listaCartoes });
};
