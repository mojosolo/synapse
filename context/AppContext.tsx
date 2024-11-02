"use client";

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AppContextProps {
  contextData: Record<string, unknown>;
  updateContext: (newData: Record<string, unknown>) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [contextData, setContextData] = useState<Record<string, unknown>>(null);

  useEffect(() => {
    fetch("/api/update-context")
      .then((res) => res.json())
      .then((data) => setContextData(data.contextData));
  }, []);

  const updateContext = (newData: Record<string, unknown>) => {
    fetch("/api/update-context", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => setContextData(data.contextData));
  };

  return (
    <AppContext.Provider value={{ contextData, updateContext }}>
      {children}
    </AppContext.Provider>
  );
}; 