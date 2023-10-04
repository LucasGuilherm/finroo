import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/signIn");
  // } else {
  //   redirect("/dashboard");
  // }

  return (
    <main className="overflow-hidden items-center flex flex-col gap-12">
      {/* <h1>Home Page</h1>
      <Link href={"/dashboard"}>
        <Button variant={"default"}>Dahsboard</Button>
      </Link>
      <Link href={"/signIn"}>
        <Button variant={"default"}>signin</Button>
      </Link> */}
    </main>
  );
}
