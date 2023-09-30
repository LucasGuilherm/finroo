export const MinhasContas = () => {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-medium">Minhas contas</span>
      <div className="flex flex-row gap-3 overflow-x-scroll py-4">
        <CardConta name="Dinheiro" />
        <CardConta name="Nubank" />
        <CardConta name="Inter" />
        <CardConta name="Inter Crédito" />
      </div>
    </div>
  );
};

const CardConta = ({ name }: { name: string }) => {
  return (
    <div className="bg-zinc-100 p-4 rounded-xl w-3/5 shrink-0 flex flex-col gap-2">
      <span className="text-lg font-medium">{name}</span>
      <span>R$ 300,00</span>
    </div>
  );
};
