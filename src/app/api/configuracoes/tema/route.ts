import { authOptions } from "@/lib/auth";
import { alterarTema } from "@/lib/dbActions/configuracoes";
import { pagarFatura } from "@/lib/dbActions/faturas";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  type themeColorProps = {
    themeColor: string;
  };

  const { themeColor }: themeColorProps = await request.json();

  await alterarTema({
    themeColor: themeColor,
    userId: userId,
  });

  // if ("error" in fatura) {
  //   return NextResponse.json({ error: fatura.error }, { status: 400 });
  // }

  return NextResponse.json({ sucesso: true });
};
