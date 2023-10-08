import Link from "next/link";
import AccountsList from "./components/accountsList";
import { Suspense } from "react";
import { Plus } from "lucide-react";

const Accounts = () => {
  return (
    <>
      {/* <NavHeader variant="close" /> */}

      <h1 className="text-2xl font-medium">Minhas contas e cartoes</h1>

      <Suspense>
        <AccountsList />
      </Suspense>

      <Link
        className="bg-white shadow font-medium flex flex-row justify-center gap-3 p-4 rounded-lg"
        href={"/newAccount"}
      >
        <Plus />
        Nova conta
      </Link>
    </>
  );
};

export default Accounts;
