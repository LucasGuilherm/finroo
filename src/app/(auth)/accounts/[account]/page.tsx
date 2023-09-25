"use client";

import NavHeader from "@/components/navHeader";
import { useSession } from "next-auth/react";

type pageProps = {
  params: { account: string };
};

const Account = ({ params }: pageProps) => {
  return (
    <>
      <NavHeader variant="back" />
      <h1 className="text-3xl font-medium">Dinheiro</h1>
    </>
  );
};

export default Account;
