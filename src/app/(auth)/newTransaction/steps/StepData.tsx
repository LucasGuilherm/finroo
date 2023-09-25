"use client";

import { useContext, useRef, useState } from "react";
import { NewContext } from "../NewContext";
import { Input } from "@/components/ui/input";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SteData = () => {
  const { handleNext, corDestaque, handleFormInput } = useContext(NewContext);
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

    handleFormInput({ chave: "data", valor: data });

    handleNext();
  };

  return (
    <>
      <h1 className="font-medium text-3xl">Informe a data de lançamento</h1>
      <div className="flex flex-row justify-evenly gap-4 items-center">
        <div
          onClick={() => setDate("ontem")}
          className={cn(
            `rounded-full flex-1 text-center p-2 font-medium cursor-pointer bg-slate-200 ${
              shortCut == "ontem" && `bg-${corDestaque}`
            }`
          )}
        >
          Ontem
        </div>
        <div
          onClick={() => setDate("hoje")}
          className={cn(
            `rounded-full flex-1 text-center p-2 font-medium cursor-pointer bg-slate-200 ${
              shortCut == "hoje" && `bg-${corDestaque}`
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
          variant={corDestaque}
        >
          Avançar
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default SteData;
