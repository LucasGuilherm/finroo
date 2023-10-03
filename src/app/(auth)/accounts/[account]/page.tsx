import { authOptions } from "@/lib/auth";
import { getContaById } from "@/lib/dbActions/contas";
import { getServerSession } from "next-auth";
import ButtonTransfer from "./components/btnTransfer";
import ListaLancamentos from "@/components/listaLancamentos";
import { mascaraMoeda } from "@/lib/utils";

type pageProps = {
  params: { account: string };
};

const Account = async ({ params }: pageProps) => {
  const session = await getServerSession(authOptions);

  const conta = await getContaById({
    contaId: Number(params.account),
    userId: Number(session?.user.id),
  });

  if (!conta) {
    return;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 my-3">
        <h1 className="text-2xl font-medium">{conta?.conta}</h1>

        <div className="font-medium">
          <span className="text-xl">R$ </span>
          <span className="text-3xl ">
            {mascaraMoeda(Number(conta?.saldo))}
          </span>
        </div>
      </div>

      <ButtonTransfer conta={conta?.id} saldo={Number(conta.saldo)} />

      <ListaLancamentos conta={Number(params.account)} />
    </>
  );
};

export default Account;
