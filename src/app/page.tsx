import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden items-center flex flex-col gap-12">
      <h1>Home Page</h1>
      <Link href={"/dashboard"}>
        <Button variant={"default"}>Dahsboard</Button>
      </Link>
    </main>
  );
}
