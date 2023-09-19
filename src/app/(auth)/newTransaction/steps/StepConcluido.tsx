import { PenIcon, PencilIcon } from "lucide-react";
import { useContext } from "react";
import { NewContext } from "../NewContext";

const StepConcluido = () => {
  const { form } = useContext(NewContext);

  const { tipo } = form;

  return (
    <div className="flex flex-col items-center gap-7 h-full justify-center">
      <span className="font-medium text-3xl">
        Registrando {tipo.toLocaleLowerCase()}
      </span>
      <PencilIcon size={36} />
    </div>
  );
};

export default StepConcluido;
