"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";

const CheckErrorSession = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  if (session?.user.error) {
    signOut({ callbackUrl: "/signIn" });
  }

  return <>{children}</>;
};

export { SessionProvider, CheckErrorSession };
