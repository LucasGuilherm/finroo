"use client";

import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import ColorSelect from "./colorSelect";

const UserHeader = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="flex flex-row items-center gap-4 justify-end">
            <div className="relative w-9 h-9 rounded-full overflow-hidden">
              <Image
                layout="fill"
                objectFit="cover"
                alt="profile"
                src="/profile.jpg"
              />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Finroo</SheetTitle>
          </SheetHeader>

          <section className="flex flex-col gap-4 py-4">
            {/* <ColorSelect />
            <Separator /> */}
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
    </>
  );
};

export default UserHeader;
