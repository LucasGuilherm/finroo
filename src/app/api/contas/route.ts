import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const listaContas = [
    { id: 1, nome: "Dinheiro" },
    { id: 2, nome: "Inter Débito" },
    { id: 3, nome: "Nubank Débito" },
    { id: 4, nome: "Nubank Crédito" },
  ];

  return NextResponse.json({ listaContas });
};
