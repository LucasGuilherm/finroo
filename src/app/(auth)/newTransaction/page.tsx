"use client";

import { useContext } from "react";
import { NewContext } from "./NewContext";
import { FormHandle } from "./formHandle";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

function NewTransaction() {
  const { step, handleBack, handleNext } = useContext(NewContext);

  const router = useRouter();

  const handleIconClick = () => {
    if (step == 1 || step == 6) {
      router.back();
      return;
    }

    handleBack();
  };

  return (
    <>
      <div
        onClick={handleIconClick}
        className="flex flex-row items-center gap-2 w-fit"
      >
        {step == 1 || step == 6 ? (
          <>
            <X size={28} />
            <span className="font-medium">fechar</span>
          </>
        ) : (
          <>
            <ChevronLeft size={28} />
            <span className="font-medium">voltar</span>
          </>
        )}
      </div>

      <FormHandle />
    </>
  );
}

export default NewTransaction;
