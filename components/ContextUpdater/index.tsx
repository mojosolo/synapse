"use client";

import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";

const ContextUpdater = () => {
  const { setContextData } = useContext(AppContext);
  const [newContext, setNewContext] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContextData(newContext);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs to update context data */}
      <input
        type="text"
        placeholder="Video Script"
        onChange={(e) => setNewContext({ ...newContext, videoScript: e.target.value })}
      />
      <input
        type="text"
        placeholder="Bot Name"
        onChange={(e) => setNewContext({ ...newContext, botName: e.target.value })}
      />
      {/* Add more inputs as needed */}
      <button type="submit">Update Context</button>
    </form>
  );
};

export default ContextUpdater; 