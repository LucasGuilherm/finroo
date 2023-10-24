import { TransactionForm } from "@/app/(auth)/newTransaction/page";
import { authOptions } from "@/lib/auth";
import {
  createLancamento,
  totalDespesasMes,
  totalReceitasMes,
} from "@/lib/dbActions/lancamentos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const [totalDespesas, totalReceitas] = await Promise.all([
    totalDespesasMes(userId),
    totalReceitasMes(userId),
    // totalEconomiasMes(userId),
  ]);

  return NextResponse.json({ totalDespesas, totalReceitas });
};
