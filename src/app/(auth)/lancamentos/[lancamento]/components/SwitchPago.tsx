"use client";

import { Switch } from "@/components/ui/switch";
import { fetchApi } from "@/lib/fetchWrap";
import { useState } from "react";

const SwitchPago = ({
  checkedLancamento,
  id,
}: {
  checkedLancamento: boolean;
  id: number;
}) => {
  const [checked, setChecked] = useState(checkedLancamento);

  const handleChecked = async (value: boolean) => {
    setChecked(value);
    const resp = await fetchApi("/lancamentos/setPago", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        pago: value,
      }),
    });

    if (!resp) {
      setChecked(!value);
    }
  };

  return (
    <>
      <Switch
        checked={checked}
        onCheckedChange={(value) => handleChecked(value)}
      />
    </>
  );
};
export default SwitchPago;
