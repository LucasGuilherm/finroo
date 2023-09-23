type props = {
  id: number;
  nome: string;
  onClick: (id: number) => void;
};

export const ItemConta = ({ id, nome, onClick }: props) => {
  return (
    <div
      key={id}
      className="flex flex-row items-center gap-4"
      onClick={() => onClick(id)}
    >
      <div className="bg-slate-200 rounded-full h-12 w-12"></div>
      <span className="font-medium text-base">{nome}</span>
    </div>
  );
};
