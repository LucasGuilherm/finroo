"use client";

import { Menu } from "lucide-react";
import SideBar from "./sideBar";
import { useState } from "react";

const UserHeader = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (state: boolean) => {
    setOpen(state);
  };

  return (
    <>
      <div className="ml-auto">
        <Menu size={28} onClick={() => handleClick(true)} />
      </div>
      <SideBar open={open} handleClose={() => handleClick(false)} />
    </>
  );
};

export default UserHeader;
