import { FormInputs } from "@/app/(auth)/newTransaction/NewContext";
import { createLancamento } from "@/lib/lancamentos";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data: FormInputs = await request.json();

  const lancamento = await createLancamento({ descricao: data.descricao });

  return NextResponse.json({ lancamento });
};
