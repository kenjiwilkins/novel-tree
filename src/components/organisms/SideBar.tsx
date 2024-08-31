import React from "react";
import { useAtomValue } from "jotai";
import { sidebarWidthAtom } from "../../states/windowSizes";

interface SideBarProps {
  children?: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const sidebarWidth = useAtomValue(sidebarWidthAtom);
  return (
    <aside
      className="h-screen p-2 border-r border-solid flex flex-col gap-0"
      style={{ maxWidth: `${sidebarWidth}px` }}
    >
      {children}
    </aside>
  );
};
