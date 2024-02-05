"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { LogOut } from "lucide-react";
import ColorSelect from "./colorSelect";
import { Separator } from "./ui/separator";
import { useTheme } from "@/providers/themeProvider";

type sideBarProps = {
  open: boolean;
  handleClose: () => void;
};

const SideBar = ({ open, handleClose }: sideBarProps) => {
  const { theme } = useTheme();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent style={{ backgroundColor: theme }} side={"right"}>
        <SheetHeader>
          <SheetTitle>Finroo</SheetTitle>
        </SheetHeader>

        <section className="flex mt-auto flex-col gap-4 py-4">
          <ColorSelect />

          <Separator />

          <Button
            onClick={handleLogout}
            variant={"destructive"}
            className="justify-between py-6"
          >
            Desconectar <LogOut className="stroke-white" />
          </Button>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
