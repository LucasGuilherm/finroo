"use client";

import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

type props = {
  variant: "back" | "close";
};

const NavHeader: React.FC<props> = ({ variant }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div>
      {variant == "back" ? (
        <ChevronLeft size={28} onClick={handleClick} />
      ) : (
        <X size={28} onClick={handleClick} />
      )}
    </div>
  );
};

export default NavHeader;
