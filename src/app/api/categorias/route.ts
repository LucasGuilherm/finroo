import { getCategorias } from "@/lib/dbActions/categorias";
import { NextResponse } from "next/server";

export const GET = async () => {
  const categorias = await getCategorias();

  return NextResponse.json(categorias);
};
