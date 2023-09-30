// "use client";

import NavHeader from "@/components/navHeader";

type pageProps = {
  params: { account: string };
};

const Account = async ({ params }: pageProps) => {
  return (
    <>
      <NavHeader variant="back" />
      <h1 className="text-3xl font-medium">Dinheiro</h1>
    </>
  );
};

export default Account;
