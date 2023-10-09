import { authOptions } from "@/lib/auth";
import { saldoTotal } from "@/lib/lancamentos";
import { mascaraMoeda } from "@/lib/utils";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const SaldoTotal = async () => {
  const session = await getServerSession(authOptions);

  const saldo = await saldoTotal(Number(session?.user.id));

  const saldoMask = mascaraMoeda(saldo);

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg">Saldo</span>
      <span className="text-4xl font-medium">
        <span className="text-3xl">R$ </span>
        {saldoMask}
      </span>
    </div>
  );
};

export default SaldoTotal;
