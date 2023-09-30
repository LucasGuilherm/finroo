import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mascaraMoeda = (valor: number | undefined | null) => {
  const value = valor || 0;

  return value.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
};
