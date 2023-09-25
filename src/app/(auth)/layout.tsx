import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log(session);

  // if (!session) {
  //   redirect("/signIn");
  //   return;
  // }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
