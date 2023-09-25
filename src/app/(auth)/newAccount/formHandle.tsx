import { useContext } from "react";
import { NewContext } from "./NewContext";
import StepDescricao from "./steps/StepDescricao";
import StepTipo from "./steps/StepTipo";
import StepCredito from "./steps/StepCredito";
import StepConcluido from "./steps/StepConcluido";
import StepSaldoInicial from "./steps/StepSaldoInicial";

export const FormHandle = () => {
  const { step, form } = useContext(NewContext);

  switch (step) {
    case 1:
      return <StepDescricao />;
    case 2:
      return <StepTipo />;
    case 3:
      if (form.tipo == "Crédito") {
        return <StepCredito />;
      }

      return <StepSaldoInicial />;
    case 4:
      return <StepConcluido />;
  }
};
