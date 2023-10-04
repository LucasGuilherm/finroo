import { authOptions } from "@/lib/auth";
import {
  CheckErrorSession,
  SessionProvider,
} from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log({ session: session?.user });

  if (!session?.user) {
    console.log("Erro sessao");

    // redirect("/signIn");
  }

  return (
    <SessionProvider session={session}>
      <CheckErrorSession>{children}</CheckErrorSession>
    </SessionProvider>
  );
}
