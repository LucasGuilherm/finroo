"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import ConfirmacaoExcluir from "./ConfirmacaoExcluir";

const BtnExcluir = ({ id }: { id: number }) => {
  const [confirm, setConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setConfirm((old) => !old);
  };

  return (
    <>
      <ConfirmacaoExcluir id={id} open={confirm} close={handleOpenConfirm} />
      <Button
        className="rounded-full text-lg gap-2 transition-all bg-destructive/90"
        size={"lg"}
        variant={"destructive"}
        onClick={handleOpenConfirm}
      >
        <Trash />
        Excluir
      </Button>
    </>
  );
};

export default BtnExcluir;
