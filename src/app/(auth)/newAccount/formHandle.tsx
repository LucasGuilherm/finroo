import { useContext } from "react";
import { NewContext } from "./NewContext";
import StepDescricao from "./steps/StepDescricao";
import StepTipo from "./steps/StepTipo";
import StepCredito from "./steps/StepCredito";
import StepConcluido from "./steps/StepConcluido";
import StepSaldoInicial from "./steps/StepSaldoInicial";
// import StepConta from "./steps/StepConta";
// import StepValor from "./steps/StepValor";
// import StepData from "./steps/StepData";
// import StepCategoria from "./steps/StepCategoria";
// import StepConcluido from "./steps/StepConcluido";

export const FormHandle = () => {
  const { step, form } = useContext(NewContext);

  console.log(step);

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
