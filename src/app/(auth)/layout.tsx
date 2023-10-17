import { authOptions } from "@/lib/auth";
import { getUserTheme } from "@/lib/dbActions/user";
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

  // const themeColor = await getUserTheme({ userId: Number(session?.user.id) });

  // const color = themeColor
  //   ? "bg-" + String(themeColor) + "-100"
  //   : "bg-zinc-100";

  return (
    <SessionProvider session={session}>
      <CheckErrorSession>
        <main className={`bg-pink-100 min-h-screen overflow-auto`}>
          {children}
        </main>
      </CheckErrorSession>
    </SessionProvider>
  );
}
