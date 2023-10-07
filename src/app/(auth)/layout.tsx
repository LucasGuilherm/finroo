import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import {
  CheckErrorSession,
  SessionProvider,
} from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <CheckErrorSession>
        <main className="bg-zinc-100 overflow-auto">{children}</main>
      </CheckErrorSession>
    </SessionProvider>
  );
}
