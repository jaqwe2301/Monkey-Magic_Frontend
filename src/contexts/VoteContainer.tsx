"use client";

import { createContext, useContext, useState } from "react";

interface VoteContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <VoteContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = (): VoteContextType => {
  const context = useContext(VoteContext);
  if (!context) throw new Error("useVote must be used within a VoteProvider");
  return context;
};
