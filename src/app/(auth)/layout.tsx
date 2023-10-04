import { authOptions } from "@/lib/auth";
import {
  CheckErrorSession,
  SessionProvider,
} from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session) {
    redirect("/signIn");
  }

  return (
    <SessionProvider session={session}>
      {/* <CheckErrorSession> */}
      {children}
      {/* </CheckErrorSession> */}
    </SessionProvider>
  );
}
