"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { LogOut } from "lucide-react";

type sideBarProps = {
  open: boolean;
  handleClose: () => void;
};

const SideBar = ({ open, handleClose }: sideBarProps) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Finroo</SheetTitle>
        </SheetHeader>

        <section className="flex flex-col gap-4 py-4">
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
