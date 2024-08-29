import React from "react";

interface SideBarProps {
  children?: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <aside className="min-w-32 overflow-x-hidden h-screen p-2 border-r border-solid flex flex-col gap-0">
      {children}
    </aside>
  );
};
