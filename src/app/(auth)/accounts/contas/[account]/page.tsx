import { authOptions } from "@/lib/auth";
import { getContaById } from "@/lib/dbActions/contas";
import { getServerSession } from "next-auth";
import ButtonTransfer from "./components/btnTransfer";
import ListaLancamentos from "@/components/listaLancamentos";
import { mascaraMoeda } from "@/lib/utils";

type pageProps = {
  params: { account: string };
  searchParams: { tipo: "cartao" | "conta" };
};

const Account = async ({ params, searchParams }: pageProps) => {
  const session = await getServerSession(authOptions);

  const { tipo } = searchParams;

  let conta;

  if (tipo == "conta") {
    conta = await getContaById({
      contaId: Number(params.account),
      userId: Number(session?.user.id),
    });
  }

  if (!conta) {
    return <h1>Conta não existe</h1>;
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
