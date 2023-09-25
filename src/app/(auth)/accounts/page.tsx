import NavHeader from "@/components/navHeader";
import Link from "next/link";
import AccountsList from "./components/accountsList";
import { Suspense } from "react";
import Loading from "../loading";

// export const revalidate = 1;

const Accounts = () => {
  return (
    <>
      <NavHeader variant="close" />

      <h1 className="text-2xl font-medium">Minhas contas</h1>

      {/* <Suspense fallback={<Loading />}> */}
      <AccountsList />
      {/* </Suspense> */}

      <Link
        className="bg-slate-200 flex flex-row justify-center gap-3 p-4 rounded-lg"
        href={"/newAccount"}
      >
        Criar nova conta
      </Link>
    </>
  );
};

export default Accounts;
