import { MainBackground } from "@/components/mainBackground";
import { authOptions } from "@/lib/auth";
import { getUserTheme } from "@/lib/dbActions/user";
import {
  CheckErrorSession,
  SessionProvider,
} from "@/providers/sessionProvider";
import { ThemeContextProvider } from "@/providers/themeProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const themeColor = await getUserTheme({
    userId: Number(session?.user.id) || 0,
  });

  return (
    <SessionProvider session={session}>
      <CheckErrorSession>
        <ThemeContextProvider defaultTheme={themeColor}>
          <MainBackground>{children}</MainBackground>
        </ThemeContextProvider>
      </CheckErrorSession>
    </SessionProvider>
  );
}
