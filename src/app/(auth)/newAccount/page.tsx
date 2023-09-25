"use client";

import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormHandle } from "./formHandle";
import { useContext } from "react";
import { NewContext } from "./NewContext";

function NewAccount() {
  const router = useRouter();
  const { step, handleBack } = useContext(NewContext);

  const handleIconClick = () => {
    if (step == 1 || step == 4) {
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
        {step == 1 || step == 4 ? (
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

export default NewAccount;
