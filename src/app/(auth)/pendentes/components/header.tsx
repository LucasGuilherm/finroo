"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return <X onClick={() => router.back()} size={28} />;
};

export default Header;
