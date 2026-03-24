import React from "react";
import { Sidebar } from "@/shared/components/Sidebar";

type TicketViewsLayoutProps = {
  children: React.ReactNode;
};

export const TicketViewsLayout = ({ children }: TicketViewsLayoutProps) => {
  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <Sidebar />
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};
