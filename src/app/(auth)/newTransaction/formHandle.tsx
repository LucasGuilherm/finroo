import { useContext } from "react";
import { NewContext } from "./NewContext";
import StepConta from "./steps/StepConta";
import StepValor from "./steps/StepValor";
import StepDescricao from "./steps/StepDescricao";
import StepData from "./steps/StepData";
import StepCategoria from "./steps/StepCategoria";
import StepConcluido from "./steps/StepConcluido";

export const FormHandle = () => {
  const { step } = useContext(NewContext);

  switch (step) {
    case 1:
      return <StepConta />;
    case 2:
      return <StepValor />;
    case 3:
      return <StepDescricao />;
    case 4:
      return <StepData />;
    case 5:
      return <StepCategoria />;
    case 6:
      return <StepConcluido />;
  }
};
