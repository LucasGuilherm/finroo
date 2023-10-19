"use client";

import { Button } from "@/components/ui/button";
import { LucideLoader2, Trash } from "lucide-react";

const BtnExcluir = () => {
  const handleClick = () => {};

  return (
    <Button
      className="rounded-full text-lg gap-2 transition-all bg-destructive/90"
      size={"lg"}
      variant={"destructive"}
    >
      <Trash />
      Excluir
    </Button>
  );
};

export default BtnExcluir;
