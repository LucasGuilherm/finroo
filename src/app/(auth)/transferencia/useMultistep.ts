import { ReactElement, useState } from "react";

export const useMultistep = (elements: ReactElement[]) => {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((index) => {
      return index >= elements.length - 1 ? index : index + 1;
    });
  };

  const back = () => {
    setStep((index) => {
      return index <= 0 ? index : index - 1;
    });
  };

  return {
    currentStep: step,
    step: elements[step],
    back,
    next,
    steps: elements,
    isFirst: step === 1,
    isLast: step === elements.length - 1,
  };
};
