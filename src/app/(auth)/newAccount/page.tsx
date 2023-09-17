"use client";

import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormHandle } from "./formHandle";

function NewAccount() {
  const router = useRouter();

  const handleIconClick = () => {
    if (true) {
      router.back();
      return;
    }

    // handleBack();
  };

  return (
    <>
      <div
        onClick={handleIconClick}
        className="flex flex-row items-center gap-2 w-fit"
      >
        {true ? (
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
