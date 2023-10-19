"use client";

import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/fetchWrap";
import { ArrowUp } from "lucide-react";

const BtnPagarReceber = () => {
  return (
    <Button
      className="rounded-full text-lg gap-2 transition-all"
      size={"lg"}
      variant={"despesa"}
    >
      <ArrowUp />
      Pagar
    </Button>
  );
};

export default BtnPagarReceber;
