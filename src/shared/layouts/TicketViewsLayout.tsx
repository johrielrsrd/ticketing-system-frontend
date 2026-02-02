import React from "react";
import { Sidebar } from "@/shared/components/Sidebar";
import CsvUpload from "@/shared/components/CsvUpload";

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
      <main className="flex-grow-1">
        <div className="border-bottom bg-white px-4 py-3">
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div></div>
            <div>
              <CsvUpload />
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
