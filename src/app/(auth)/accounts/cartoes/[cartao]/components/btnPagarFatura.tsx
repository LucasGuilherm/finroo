import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonPagarFatura = ({ faturaId }: { faturaId: number }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`./pagarFatura?faturaId=${faturaId}`);
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
