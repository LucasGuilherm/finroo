import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  if (!userId) {
    return NextResponse.json({ message: "Error" });
  }

  type pagarFaturaProps = {
    cartaoId: number;
    faturaId: number;
    valor: number;
  };
  const { cartaoId, faturaId, valor }: pagarFaturaProps = await req.json();

  return NextResponse.json({});
};
