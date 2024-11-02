"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const SomeComponent = () => {
  const { updateContext } = useContext(AppContext);

  const handleUpdate = () => {
    updateContext({ botName: "New Bot Name" });
  };

  return <button onClick={handleUpdate}>Update Bot Name</button>;
};

export default SomeComponent; 