import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";

const ButtonPagarFatura = ({ faturaId }: { faturaId: number }) => {
  const handleClick = () => {
    console.log("Fatura Paga");
  };

  return (
    <Button
      onClick={handleClick}
      variant={"despesa"}
      className="gap-4 text-sm w-full rounded-full"
    >
      <Banknote size={24} />
      Pagar fatura
    </Button>
  );
};

export default ButtonPagarFatura;
