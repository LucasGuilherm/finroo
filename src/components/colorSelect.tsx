"use client";

import { cn } from "@/lib/utils";

const ColorSelect = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Tema</h2>

      <ul className="flex flex-col gap-2">
        <ColorChoice color="pink" name="Rosa" />
        <ColorChoice color="orange" name="Laranja" />
        <ColorChoice color="green" name="Verde" />
        <ColorChoice color="sky" name="Verde" />
      </ul>
    </div>
  );
};

type ColorChoice = {
  color: string;
  name: string;
};

const ColorChoice = ({ color, name }: ColorChoice) => {
  console.log(color);

  return (
    <li className="flex flex-row items-center gap-4">
      <div className={`bg-pink-100 w-10 h-10 border-2 border-${color}-400`} />
      <span>{color}</span>
    </li>
  );
};

export default ColorSelect;
