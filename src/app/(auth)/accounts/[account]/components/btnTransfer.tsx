"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { conta } from "../../components/accountsList";

const ButtonTransfer = ({ conta, saldo }: { conta: number; saldo: number }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/transferencia?contaSaida=${conta}&saldo=${saldo}`);
    return;
  };

  return (
    <Button
      onClick={handleClick}
      variant={"secondary"}
      className="w-full bg-zinc-200 font-medium text-base gap-3 py-6"
    >
      <ArrowUpDown size={24} />
      Transferir
    </Button>
  );
};

export default ButtonTransfer;
