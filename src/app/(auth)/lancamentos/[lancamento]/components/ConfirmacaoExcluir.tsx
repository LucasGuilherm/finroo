import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { fetchApi } from "@/lib/fetchWrap";
import { useRouter } from "next/navigation";

const ConfirmacaoExcluir = ({
  open,
  id,
  close,
}: {
  open: boolean;
  id: number;
  close: () => void;
}) => {
  const router = useRouter();

  const handleClick = async () => {
    console.log(id);

    const excluido = await fetchApi("/lancamentos/excluir", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (!excluido) {
      return;
    }

    router.back();
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Confirma Excluir?</SheetTitle>
        </SheetHeader>
        <div className="flex flex-row items-center justify-center my-12 gap-6">
          <Button
            className="rounded-full"
            size={"lg"}
            variant={"secondary"}
            onClick={close}
          >
            Cancelar
          </Button>
          <Button
            className="rounded-full"
            size={"lg"}
            variant={"destructive"}
            onClick={handleClick}
          >
            Excluir
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ConfirmacaoExcluir;
