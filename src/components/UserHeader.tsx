"use client";

import { Bell, Menu } from "lucide-react";
import SideBar from "./sideBar";
import { useState } from "react";

const UserHeader = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (state: boolean) => {
    setOpen(state);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Bell size={25} />
        <Menu size={28} onClick={() => handleClick(true)} />
      </div>
      <SideBar open={open} handleClose={() => handleClick(false)} />
    </>
  );
};

export default UserHeader;
