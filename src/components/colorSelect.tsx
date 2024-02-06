"use client";

import { fetchApi } from "@/lib/fetchWrap";
import { useTheme } from "@/providers/themeProvider";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";

const ColorSelect = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Tema</h2>

      <ul className="flex flex-col gap-2">
        <ColorChoice color="#f4f4f5" name="Cinza" />
        <ColorChoice color="#fff1f2" name="Rosa" />
        <ColorChoice color="#fff7ed" name="Laranja" />
        <ColorChoice color="#f0fdf4" name="Verde" />
        <ColorChoice color="#f0f9ff" name="Azul" />
      </ul>
    </div>
  );
};

const postAlterarTema = async (themeColor: string) => {
  await fetchApi("/configuracoes/tema", {
    method: "POST",
    body: JSON.stringify({ themeColor }),
  });
};

type ColorChoice = {
  color: string;
  name: string;
};
const ColorChoice = ({ color, name }: ColorChoice) => {
  const { theme, setTheme } = useTheme();

  const mutation = useMutation({
    mutationFn: (data: string) => postAlterarTema(data),
  });

  const clickChangeTheme = () => {
    setTheme(color);
    mutation.mutate(color, {
      onSuccess: () => {
        console.log("Cor salva com sucesso");
      },
    });
  };

  return (
    <li
      style={{ backgroundColor: color }}
      className="flex flex-row justify-between items-center gap-4 p-3 rounded border-zinc-400 border-2"
      onClick={clickChangeTheme}
    >
      <span>{name}</span>
      {theme == color && <Check />}
    </li>
  );
};

export default ColorSelect;
