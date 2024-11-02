"use client";

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Agent } from '@/agents/AgentInterface';

interface AppContextProps {
  contextData: Record<string, unknown>;
  updateContext: (newData: Record<string, unknown>) => void;
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [contextData, setContextData] = useState<Record<string, unknown>>(null);
  const [agents, setAgents] = useState<Agent[]>([]);

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
    <AppContext.Provider value={{ contextData, updateContext, agents, setAgents }}>
      {children}
    </AppContext.Provider>
  );
}; 