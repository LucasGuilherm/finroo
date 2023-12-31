"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PgtoFaturaForm } from "../page";

type StepDataProps = {
  handleNext: (inputs: Partial<PgtoFaturaForm>) => void;
};

const StepData = ({ handleNext }: StepDataProps) => {
  const [shortCut, setShortcut] = useState<"ontem" | "hoje" | "">("hoje");
  const inputRef = useRef<any>();

  const setDate = (data: "ontem" | "hoje") => {
    inputRef.current.value =
      data == "ontem"
        ? format(subDays(new Date(), 1), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd");

    setShortcut(data);
  };

  const onChangeDate = () => {
    setShortcut("");
  };

  const handleInput = () => {
    if (!inputRef.current.value) return;

    const data = new Date(inputRef.current.value);

    handleNext({
      dataPagamento: data,
    });
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Informe a data de lançamento</h1>
      <div className="flex flex-row justify-evenly gap-4 items-center">
        <div
          onClick={() => setDate("ontem")}
          className={cn(
            `rounded-full flex-1 text-center p-2 font-medium cursor-pointer bg-slate-200 ${
              shortCut == "ontem" && `bg-despesa`
            }`
          )}
        >
          Ontem
        </div>
        <div
          onClick={() => setDate("hoje")}
          className={cn(
            `rounded-full flex-1 text-center p-2 font-medium cursor-pointer bg-slate-200 ${
              shortCut == "hoje" && `bg-despesa`
            }`
          )}
        >
          Hoje
        </div>
      </div>
      <Input
        ref={inputRef}
        onChange={onChangeDate}
        type="date"
        defaultValue={format(new Date(), "yyyy-MM-dd")}
        className="border-x-0 border-t-0 font-medium text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 px-0 my-6"
      />
      <div className="flex flex-row justify-end">
        <Button
          onClick={handleInput}
          className="rounded-full font-medium items-center text-lg px-5 py-6 gap-2"
          variant="despesa"
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default StepData;
